
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from '../../freelancer.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-edit-freelancer',
  templateUrl: './edit-freelancer.component.html',
  styleUrls: ['./edit-freelancer.component.css'],
  standalone:false
})
export class FreelancerEditComponent implements OnInit {
  freelancerForm!: FormGroup;
   skills: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Fetch client details using userId from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
       this.freelancerService.getFreelancerDetails(userId).subscribe((freelancer) => {
      console.log(freelancer);
      this.freelancerForm.patchValue({
        ...freelancer,
        skills: freelancer.skillsAsList.join(',') // Set skills as a string for the form control
      });
       this.skills = freelancer.skillsAsList || [];
      });
    }
    // Initialize form
  }

  initializeForm(): void {
    // Pre-fill the form with freelancer's existing data
    this.freelancerForm = this.fb.group({
      freeEmail: ['', [Validators.required, this.customEmailValidator()]],
      freeName: ['', Validators.required],
      freeAge: ['', [Validators.required, Validators.min(18)]],
      country: ['', Validators.required],
      fow: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      qualification: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/)]],
      retypePassword: ['', Validators.required]
    },{
      validators: [this.passwordMatchValidator]
    });
  }

   customEmailValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu|net)$/;
        const value = control.value;
        return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
      };
    }

     passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const retypedPassword = control.get('retypePassword');

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
      this.freelancerForm.get('skills')?.setValue(this.skills.join(','));
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
   this.freelancerForm.get('skills')?.setValue(this.skills.join(','));
  }

  updateFreelancer(): void {
    // if (this.freelancerForm.invalid) {
    //   return;
    // }
    if(this.freelancerForm.valid){
    const updatedFreelancer = this.freelancerForm.value;
    const userId = localStorage.getItem('userId');
    if(userId){
      updatedFreelancer.freeId = userId;
      this.freelancerService.updateFreelancer(updatedFreelancer).subscribe(
        () => {
          this.notificationService.showNotification("Profile edited successfully!", 'success', '/profile/freelancer');
        },
        error => {
          this.notificationService.showNotification(error, 'error');
        }
      );
    }
    else{
      alert('Userid not found');
    }
  }
  }
}


