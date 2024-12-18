import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  template: `
    <div
      id="notification"
      [class.visible]="notificationMessage"
      [ngClass]="notificationType"
      *ngIf="notificationMessage"
    >
      {{ notificationMessage }}
    </div>
  `,
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  notificationMessage: string | null = null;
  notificationType: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notificationMessage.subscribe((message) => {
      this.notificationMessage = message;
    });

    this.notificationService.notificationType.subscribe((type) => {
      this.notificationType = type;
    });
  }
}
