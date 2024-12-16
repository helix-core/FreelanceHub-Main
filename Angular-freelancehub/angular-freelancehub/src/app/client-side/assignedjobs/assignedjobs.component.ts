import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignedjobs',
  standalone: false,
  
  templateUrl: './assignedjobs.component.html',
  styleUrl: './assignedjobs.component.css'
})
export class AssignedjobsComponent implements OnInit {
  ongoingJobs: any[] = [];
  completedJobs: any[] = [];

  constructor(private http: HttpClient) {}

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
  verifyProject(jobId: number): void {
    const formData = new FormData();
    console.log('Job ID:', jobId);
    if (!jobId) {
      console.error('Job ID is undefined or null');
      return;
    }

    formData.append('jobId', jobId.toString());

    this.http.post('/api/verify-project', formData,{ responseType: 'text' }).subscribe(
      (response) => {
        alert(response);
        this.fetchAssignedJobs(); // Refresh the job list
      },
      (error) => {
        console.error('Error verifying project:', error);
      }
    );
  }
}
