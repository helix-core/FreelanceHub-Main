import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FreelancerService } from '../../freelancer.service';
import { NotificationService } from '../../notification.service';




@Component({
  selector: 'app-signupfreelancer',
  templateUrl: './signupfreelancer.component.html',
  styleUrl: './signupfreelancer.component.css',
  standalone:false
})
export class SignupfreelancerComponent {

  signupForm!: FormGroup;
  skills: string[] = [];
  imagePreview: string | ArrayBuffer | null = null 
  defaultImage = 'assets/default-profile.png';
  resumePreview: File | null = null;


  constructor(
    private fb: FormBuilder,
    private freelancerService: FreelancerService,
    private router: Router,
    private notificationService: NotificationService
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
      profileImage: [null],
       resume: [null],  // Added for file resume
    },{
      validators: [this.passwordMatchValidator]
    });
  }

   onResumeUpload(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    // Check if file is PDF or DOC/DOCX
    if (file.type !== 'application/pdf' && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      alert("Please upload a PDF or DOC file.");
      return;
    }
    this.resumePreview = file; // Save the file object instead of a URL
    this.signupForm.get('resume')?.setValue(file);
  }
}

    removeResume(): void {
    this.resumePreview = null;
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';  // Reset the file input
    this.signupForm.get('resume')?.reset();
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

  addSkill(skill?: string): void {
    const input = document.getElementById('skills-input') as HTMLInputElement;
    const skillToAdd = skill || input.value.trim(); // Use the provided skill or input value
    if (skillToAdd) {
        this.skills.push(skillToAdd);
        this.signupForm.get('skills')?.setValue(this.skills.join(','));
        if (!skill) input.value = ''; // Clear input field only when coming from the button click
    }
}

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
   this.signupForm.get('skills')?.setValue(this.skills.join(','));
  }

  onSubmit(){
   this.signupForm.markAllAsTouched();
   console.log(this.signupForm.valid); 
   console.log('Profile Image:', this.signupForm.get('profileImage')?.value);
   console.log('Resume:', this.signupForm.get('resume')?.value);
  if (this.signupForm.valid) {
     const formData = new FormData();  // Using FormData for file upload

    // Append the form fields to formData
    Object.keys(this.signupForm.value).forEach(key => {
      if (key !== 'profileImage' && key !=='resume') {
        formData.append(key, this.signupForm.value[key]);
      }
    });

    // Append the profile image file if it exists
    const profileImageInput = document.getElementById('profile-upload') as HTMLInputElement;
    if (profileImageInput && profileImageInput.files && profileImageInput.files.length > 0) {
      formData.append('profileImage', profileImageInput.files[0]);
    }

      const resumeInput = document.getElementById('resume-upload') as HTMLInputElement;
      if (resumeInput && resumeInput.files && resumeInput.files.length>0) {
        formData.append('resume', resumeInput.files[0]);
      }

    this.freelancerService.registerFreelancer(formData).subscribe(
      response => {
        this.notificationService.showNotification(response.message, 'success', '/login');
      },
      error => {
        if (error.status === 409) {
        // Email already exists
        this.signupForm.get('freeEmail')?.setErrors({ emailExists: true });
        this.notificationService.showNotification('Email already exists. Please use a different email.', 'error');
      } else if (error.status === 400 && error.error) {
        // Other validation errors
        Object.keys(error.error).forEach(field => {
          const control = this.signupForm.get(field);
          if (control) {
            control.setErrors({ serverError: error.error[field] });
          }
        });
      } else {
        this.notificationService.showNotification(error, 'error');
      }
    }
  );
  }

  }
}