import { Component, OnInit } from '@angular/core';
import { FreelancerJob } from '../../models/freelancer-job.model';
import { FreelancerService } from '../../freelancer.service';

@Component({
  selector: 'app-appliedjobs',
  standalone: false,
  
  templateUrl: './appliedjobs.component.html',
  styleUrl: './appliedjobs.component.css'
})
export class AppliedjobsComponent implements OnInit {appliedJobs: FreelancerJob[] = [];
  notificationMessage: string = '';
  notificationType: string = '';

  constructor(private freelancerservice:FreelancerService) {}

  ngOnInit(): void {
    this.fetchAppliedJobs();
  }

  fetchAppliedJobs(): void {
  this.freelancerservice.getAppliedJobs().subscribe(
    (data) => {
      this.appliedJobs = data;
    },
    (error) => {
      console.error('Error fetching applied jobs:', error);
      this.notificationMessage = 'Failed to load applied jobs.';
      this.notificationType = 'error';
    }
  );
}
}
