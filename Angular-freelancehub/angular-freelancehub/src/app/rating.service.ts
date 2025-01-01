import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  showRatingPopup: boolean = false;
  rating: number = 0;
  currentJob: any;
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  // Open the rating popup and store the current job
  openRatingPopup(job: any): void {
    this.showRatingPopup = true;
    this.currentJob = job; // Store the job object (includes jobId, freelancerId, clientId)
  }

  // Close the rating popup
  closePopup(): void {
    this.showRatingPopup = false;
    this.rating = 0; // Reset rating
  }

  // Handle rating selection
  rateFreelancer(star: number): void {
    this.rating = star; // Update the rating based on the clicked star
  }

  // Submit the rating
  submitRating(): void {
    if (this.rating === 0) {
      alert('Please select a rating.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId || !this.currentJob) {
      alert('Invalid job or user.');
      return;
    }
    const params = new HttpParams()
    .set('freelancerId', this.currentJob.freeId.freeId)  // Pass freelancerId
    .set('clientId', userId)                            // Pass clientId
    .set('jobId', this.currentJob.jobId.jobId) // Pass jobId as string
    .set('rating', this.rating.toString());  
    
    // Send the rating to the backend
    this.http
      .post(`${this.URL}/ratings`,null, {params})
      .subscribe(
        (response) => {
          this.notificationService.showNotification('Rating submitted successfully!', 'success');
          this.closePopup(); // Close the rating popup
        },
        (error) => {
          this.notificationService.showNotification('Failed to submit rating.', 'error');
        }
      );
  }


  getRatingCount(freelancerId: string): Observable<number> {
    return this.http.get<number>(`${this.URL}/ratings?freelancerId=${freelancerId}`);
  }

}
