import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';


@Component({
  selector: 'app-clientprofile',
  standalone: false,
  
  templateUrl: './clientprofile.component.html',
  styleUrl: './clientprofile.component.css'
})
export class ClientprofileComponent implements OnInit {
client: any;
  ongoingJobs: any[] = [];
  completedJobs: any[] = [];
  notificationType: string | null = null;
  notificationMessage: string | null = null;

  constructor(private clientservice: ClientService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Fetch userId from local storage
    if (userId) {
      this.clientservice.getClientProfile(userId).subscribe(
        (data) => {
          this.client = data.client;
          this.ongoingJobs = data.ongoingJobs;
          this.completedJobs = data.completedJobs;
        },
        (error) => {
          console.error('Error fetching client profile', error);
        }
      );
    } else {
      console.error('User ID not found in local storage');
    }
  }
}

