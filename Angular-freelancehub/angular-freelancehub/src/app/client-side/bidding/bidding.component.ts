import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bidding',
  standalone: false,
  
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.css'
})
export class BiddingComponent implements OnInit {
  jobsWithBids: any[] = [];
  // notificationType: string | null = null;
  // notificationMessage: string | null = null;
  sortBy: string = 'duration';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobsWithBids();
  }

  fetchJobsWithBids(): void {
    const userId=localStorage.getItem("userId");
    this.http.get('/api/bidding', { params: { sortBy: this.sortBy ,userId: userId || ''} }).subscribe(
      (response: any) => {
        this.jobsWithBids = Array.isArray(response.jobsWithBids) ? response.jobsWithBids : [];
      },
      (error) => {
        alert(error);
      }
    );
  }

  sortBids(): void {
    this.fetchJobsWithBids();
  }

  acceptBid(jobId: number, userId: string): void {
    this.http.post('/api/acceptBid', { jobId, userId },{ responseType: 'text' }).subscribe(
      (response) => {
        alert(response);
        this.fetchJobsWithBids();
      },
      (error) => {
        alert(error);
      }
    );
  }
}
