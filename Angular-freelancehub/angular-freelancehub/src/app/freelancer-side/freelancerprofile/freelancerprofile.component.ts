  import { Component, OnInit } from '@angular/core';
  import { FreelancerService } from '../../freelancer.service';
  import { RatingService } from '../../rating.service';
  import { ActivatedRoute } from '@angular/router';
  import { AuthService } from '../../auth.service';
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
    averageRating: number = 0; 
    totalRatings: number = 0;
    userRole:String='';
     previousWorkLinks: string[] = [];
     freelancerId: string | null = null;


    constructor(private profileService: FreelancerService, private ratingService: RatingService, private route: ActivatedRoute, private authService: AuthService) {}

    ngOnInit(): void {
      if (typeof window === 'undefined' || !localStorage) {
        console.warn('localStorage is not available in this environment.');
        return;
      }
      this.freelancerId = localStorage.getItem("userId");
      this.userRole=this.authService.getUserRole() || '';
      if (this.freelancerId) {
        console.log(this.freelancerId);
        // Fetch the profile of the specific freelancer
        this.profileService.getFreelancerProfile(this.freelancerId).subscribe(

          (data) => {
            console.log(data.freelancer);
            this.freelancer = data.freelancer;
            if (this.freelancer && this.freelancer.profile_image) {
            this.freelancer.profile_image = 'http://localhost:8080' + this.freelancer.profile_image;
          }
           if (this.freelancer && this.freelancer.resume) {
                    this.freelancer.resume = 'http://localhost:8080' + this.freelancer.resume;
                }
          if (this.userRole === 'client') {
            console.log(data.previousWorkLinks)
            this.previousWorkLinks = data.previousWorkLinks || [];
          }

            this.ongoingJobs = data.ongoingJobs;
            this.completedJobs = data.completedJobs;
            this.fetchRatings(this.freelancer);
          },
          (error) => {
            console.error('Error fetching freelancer profile', error);
          }
        );
      } else {
        // Fetch the profile of the logged-in freelancer
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.profileService.getFreelancerProfile(userId).subscribe(
            (data) => {
              this.freelancer = data.freelancer;
              if (this.freelancer && this.freelancer.profile_image) {
            this.freelancer.profile_image = 'http://localhost:8080' + this.freelancer.profile_image;
          }
          if (this.freelancer && this.freelancer.resume) {
                    this.freelancer.resume = 'http://localhost:8080' + this.freelancer.resume;
                }

                 if (this.freelancer && this.freelancer.previousWorkLink) {
                    this.freelancer.previousWorkLinks = this.freelancer.previousWorkLink.split(',');
                }
              this.ongoingJobs = data.ongoingJobs;
              this.completedJobs = data.completedJobs;
              this.fetchRatings(this.freelancer);
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

    fetchRatings(freelancer: any): void {

      this.averageRating=freelancer.rating;
      console.log('Average:',this.averageRating);
      this.ratingService.getRatingCount(freelancer.freeId).subscribe(
        (ratingCount) => {
          this.totalRatings = ratingCount;
          console.log('Total Ratings:', this.totalRatings);
        },
        (error) => {
          console.error('Error fetching ratings', error);
        }
      );
    }
  }