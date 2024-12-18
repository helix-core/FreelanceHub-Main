import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../client.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-postjob',
  standalone: false,
  templateUrl: './postjob.component.html',
  styleUrl: './postjob.component.css'
})
export class PostjobComponent {
  clientJob: any = {
    jobTitle: '',
    jobDesc: '',
    skillReq: [],
    durMin: 0,
    durMax: 0,
    costMin: 0,
    costMax: 0,
    expMin: 0,
    jobStat: 'pending'
  };

  constructor(private http: HttpClient, private router: Router, private clientService: ClientService, private notificationService :NotificationService) {}

  addSkill(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      const skill = inputElement.value.trim();
      if (skill && !this.clientJob.skillReq.includes(skill)) {
        this.clientJob.skillReq.push(skill); 
        inputElement.value = ''; 
      }
  
      event.preventDefault(); 
    }
  }

  removeSkill(skill: string) {
    this.clientJob.skillReq = this.clientJob.skillReq.filter((s: string) => s !== skill);
  }

  submitJobForm(): void {
    this.clientService.postJob(this.clientJob).subscribe({
      next: (response) => {
        this.notificationService.showNotification('Job Posted Successfully!', 'success', '/posted-jobs');
      },
      error: (error) => {
        this.notificationService.showNotification(error, 'error');
      },
    });
  }
}
