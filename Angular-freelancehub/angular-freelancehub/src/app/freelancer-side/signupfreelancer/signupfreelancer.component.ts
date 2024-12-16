import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private freelancerService: FreelancerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      freeEmail: ['', [Validators.required, Validators.email]],
      freeName: ['', Validators.required],
      freeAge: ['', [Validators.required, Validators.min(18)]],
      country: ['', Validators.required],
      fow: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      qualification: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSkillInput(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement);
    if (event.key === 'Enter' && input.value.trim()) {
      this.skills.push(input.value.trim());
      this.signupForm.patchValue({ skills: this.skills.join(',') });
      input.value = ''; // Clear input after pressing Enter
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
    this.signupForm.patchValue({ skills: this.skills.join(',') });
  }

  onSubmit(){
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.freelancerService.registerFreelancer(formData).subscribe(response => {
        console.log('Freelancer Registered Successfully', response);
        this.router.navigate(['/login']);
      });
    }
  }
}