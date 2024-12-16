import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-posted-jobs',
  standalone:false,
  templateUrl: './postedjobs.component.html',
  styleUrls: ['./postedjobs.component.css'],
})
export class PostedJobsComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.fetchPostedJobs();
  }

  fetchPostedJobs() {
    this.clientService.getPostedJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching jobs', error);
      },
      complete: () => {
        console.log('Job fetching completed'); // Handle completion (optional)
      }
   });
  }
}
