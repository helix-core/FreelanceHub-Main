
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from '../../freelancer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-freelancer',
  templateUrl: './edit-freelancer.component.html',
  styleUrls: ['./edit-freelancer.component.css'],
  standalone:false
})
export class FreelancerEditComponent implements OnInit {
  freelancerForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Fetch client details using userId from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.freelancerService.getFreelancerDetails(userId).subscribe((freelancer) => {
        this.freelancerForm.patchValue(freelancer);
        

      });
    }
    // Initialize form
  }

  initializeForm(): void {
    // Pre-fill the form with freelancer's existing data
    this.freelancerForm = this.fb.group({
      freeEmail: ['', [Validators.required, Validators.email]],
      freeName: ['', Validators.required],
      freeAge: ['', [Validators.required, Validators.min(18)]],
      country: ['', Validators.required],
      fow: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      qualification: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', Validators.required]
    });
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
          alert('Profile updated successfully!');
          this.router.navigate(['/profile/freelancer']);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
    else{
      alert('Userid not found');
    }
  }
  }
}


