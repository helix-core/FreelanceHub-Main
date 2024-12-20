import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { RatingService } from '../../rating.service';

@Component({
  selector: 'app-assignedjobs',
  standalone: false,
  
  templateUrl: './assignedjobs.component.html',
  styleUrl: './assignedjobs.component.css'
})
export class AssignedjobsComponent implements OnInit {
  ongoingJobs: any[] = [];
  completedJobs: any[] = [];

  constructor(private http: HttpClient,private notificationService: NotificationService, private ratingService:RatingService) {}

  ngOnInit(): void {
    this.fetchAssignedJobs();
  }

  // Fetch ongoing and completed jobs
  fetchAssignedJobs(): void {
    const userId= localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    this.http.get('/api/assigned-jobs',{params}).subscribe(
      (response: any) => {
        this.ongoingJobs = response.ongoingJobs || [];
        this.completedJobs = response.completedJobs || [];
      },
      (error) => {
        console.error('Error fetching assigned jobs:', error);
      }
    );
  }

  // Verify a project
  verifyProject(job: any): void {
    const formData = new FormData();
    console.log('Job ID:', job.id);
    if (!job.id) {
      console.error('Job ID is undefined or null');
      return;
    }

    formData.append('jobId', job.id.toString());

    this.http.post('/api/verify-project', formData,{ responseType: 'text' }).subscribe(
      (response) => {
        this.fetchAssignedJobs(); // Refresh the job list
        this.notificationService.showNotification(response, 'success');
        this.ratingService.openRatingPopup(job);
      },
      (error) => {
        this.notificationService.showNotification(error, 'error');
      }
    );
  }

  get showRatingPopup(): boolean {
    return this.ratingService.showRatingPopup;
  }

  get rating(): number {
    return this.ratingService.rating;
  }

  rateFreelancer(star: number): void {
    this.ratingService.rateFreelancer(star); // Use the service method
  }

  submitRating(): void {
    this.ratingService.submitRating(); // Use the service method to submit the rating
  }

  closePopup(): void {
    this.ratingService.closePopup(); // Use the service method to close the popup
  }


}
