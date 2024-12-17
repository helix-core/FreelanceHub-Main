import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../freelancer.service';
@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancerprofile.component.html',
  styleUrls: ['./freelancerprofile.component.css'],
  standalone:false
})
export class FreelancerProfileComponent implements OnInit {
  freelancer: any;
  ongoingJobs: any[] = [];
  completedJobs: any[] = [];
  notificationType: string | null = null;
  notificationMessage: string | null = null;

  constructor(private profileService: FreelancerService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Fetch userId from local storage
    if (userId) {
      this.profileService.getFreelancerProfile(userId).subscribe(
        (data) => {
          console.log(data.freelancer);
          this.freelancer = data.freelancer;
          this.ongoingJobs = data.ongoingJobs;
          this.completedJobs = data.completedJobs;
        },
        (error) => {
          console.error('Error fetching freelancer profile', error);
        }
      );
    } else {
      console.error('User ID not found in local storage');
    }
  }
}