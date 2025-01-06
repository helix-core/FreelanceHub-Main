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


  openRatingPopup(job: any): void {
    this.showRatingPopup = true;
    this.currentJob = job; 
  }


  closePopup(): void {
    this.showRatingPopup = false;
    this.rating = 0;
  }

  
  rateFreelancer(star: number): void {
    this.rating = star; 
  }

  
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
    .set('freelancerId', this.currentJob.freeId.freeId)  
    .set('clientId', userId)                            
    .set('jobId', this.currentJob.jobId.jobId) 
    .set('rating', this.rating.toString());  
    
    
    this.http
      .post(`${this.URL}/ratings`,null, {params})
      .subscribe(
        (response) => {
          this.notificationService.showNotification('Rating submitted successfully!', 'success');
          this.closePopup(); 
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
