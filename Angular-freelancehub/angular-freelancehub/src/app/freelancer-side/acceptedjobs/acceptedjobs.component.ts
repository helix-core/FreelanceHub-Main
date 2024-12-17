import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../freelancer.service';
import { FreelancerJob } from '../../models/freelancer-job.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acceptedjobs',
  standalone: false,
  
  templateUrl: './acceptedjobs.component.html',
  styleUrl: './acceptedjobs.component.css'
})
export class AcceptedjobsComponent implements OnInit{
  acceptedJobs: FreelancerJob[] = [];
  githubLink: string = '';
  notificationType: string = '';
  notificationMessage: string = '';

  constructor(
    private freelancerservice: FreelancerService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAcceptedJobs();
    setInterval(() => {
        this.updateRemainingTimes();
    }, 60000); 
  }

  loadAcceptedJobs() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.http.get<FreelancerJob[]>(`/api/accepted-jobs?userId=${userId}`).subscribe(
      (data) => {
        console.log('Accepted Jobs:', data);  // Log data to check structure
        this.acceptedJobs = data;
      },
      (error) => {
        console.error('Error fetching accepted jobs', error);
      }
    );
  } else {
    console.error('User ID not found');
  }
}

  toggleUpload(jobId: number, event: Event) {
    event.stopPropagation(); // Prevent the event from propagating
    const form = document.getElementById('upload-form-' + jobId) as HTMLElement;
    const jobCard = document.querySelector('#job-card-' + jobId) as HTMLElement;

    if (form && jobCard) {
      const isVisible = form.style.display === 'block';

      // Hide all forms and remove 'open' class from all job cards
      const allForms = document.querySelectorAll('.upload-form');
      allForms.forEach((f) => (f as HTMLElement).style.display = 'none');
      const allJobCards = document.querySelectorAll('.job-card');
      allJobCards.forEach((card) => card.classList.remove('open'));

      // Toggle the clicked form based on its previous state
      form.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        jobCard.classList.add('open');
      }
    }

    // Log for debugging
    console.log('Toggling upload form for jobId: ' + jobId);
  }

  uploadProject(jobId: number) {
    const formData = new FormData();
    formData.append('jobId', jobId.toString());
    formData.append('githubLink', this.githubLink);

    this.http.post('/api/upload-project', formData,{responseType:'text'}).subscribe(
      (response) => {
        // this.notificationType = 'success';
        // this.notificationMessage = 'Upload Successful!';
        alert(response);
        this.githubLink='';
        this.loadAcceptedJobs();
      },
      (error) => {
        // this.notificationType = 'error';
        // this.notificationMessage = 'Upload Failed!';
        console.error('Error uploading project', error);
      }
    );
  }

  updateRemainingTimes() {
    this.acceptedJobs.forEach(job => {
        job.remainingTime = this.calculateRemainingTime(job.duration, job.acceptedAt);
    });
}

calculateRemainingTime(duration: number, acceptedAt: string): number {
    const acceptedDate = new Date(acceptedAt);
    const endDate = new Date(acceptedDate.getTime() + duration * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();

    if (diffTime <= 0) {
        return 0; // Time expired
    }
    const remainingDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
    return remainingDays; // Return number
}
}

