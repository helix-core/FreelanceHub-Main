import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FreelancerService } from '../../freelancer.service';




@Component({
  selector: 'app-signupfreelancer',
  templateUrl: './signupfreelancer.component.html',
  styleUrl: './signupfreelancer.component.css',
  standalone:false
})
export class SignupfreelancerComponent {
  signupForm!: FormGroup;
  skills: string[] = [];
  imagePreview: string | ArrayBuffer | null = 'assets/default-profile.png'; // Path to your default image
  defaultImage = 'assets/default-profile.png';


  constructor(
    private fb: FormBuilder,
    private freelancerService: FreelancerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      freeEmail: ['', [Validators.required, this.customEmailValidator()]],
      freeName: ['', Validators.required],
      freeAge: ['', [Validators.required, Validators.min(18)]],
      country: ['', Validators.required],
      FOW: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', [Validators.required]],
      qualification: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],
      termsAndConditions: [false, Validators.requiredTrue],
      profileImage: [null, Validators.required],
    },{
      validators: [this.passwordMatchValidator]
    });
  }

   onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage(event: Event): void {
    event.stopPropagation(); 
    event.preventDefault();
    this.imagePreview = this.defaultImage;
    const fileInput = document.getElementById('profile-upload') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';  // Reset the file input
  }
  }


   customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu)$/;
      const value = control.value;
      return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
    };
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const retypedPassword = control.get('rePassword');

  // If passwords don't match, return error object
  if (password && retypedPassword && password.value !== retypedPassword.value) {
    return { passwordMismatch: true };
  }

  // If passwords match, return null (no error)
  return null;
};


  onSkillInput(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement);
    if (event.key === 'Enter' && input.value.trim()) {
      event.preventDefault();
      this.skills.push(input.value.trim());
      input.value = ''; // Clear input field
      this.signupForm.get('skills')?.setValue(this.skills.join(','));
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
   this.signupForm.get('skills')?.setValue(this.skills.join(','));
  }

  onSubmit(){
   this.signupForm.markAllAsTouched();
  if (this.signupForm.valid) {
     const formData = new FormData();  // Using FormData for file upload

    // Append the form fields to formData
    Object.keys(this.signupForm.value).forEach(key => {
      if (key !== 'profileImage') {
        formData.append(key, this.signupForm.value[key]);
      }
    });

    // Append the profile image file if it exists
    const profileImageInput = document.getElementById('profile-upload') as HTMLInputElement;
    if (profileImageInput && profileImageInput.files && profileImageInput.files.length > 0) {
      formData.append('profileImage', profileImageInput.files[0]);
    }

    this.freelancerService.registerFreelancer(formData).subscribe(
      response => {
        console.log('Freelancer Registered Successfully', response);
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400 && error.error) {
          Object.keys(error.error).forEach(field => {
            const control = this.signupForm.get(field);
            if (control) {
              control.setErrors({ serverError: error.error[field] });
            }
          });
        }
      }
    );
  }
  }
}