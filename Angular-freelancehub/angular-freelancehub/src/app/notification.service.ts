import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationMessage = new BehaviorSubject<string | null>(null);
  notificationType = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {}
  
  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning', redirectUrl?: string) {
    this.notificationMessage.next(message);
    this.notificationType.next(type);
    
    if (redirectUrl) {
      this.router.navigate([redirectUrl]).then(() => {
        setTimeout(() => {
          this.clearNotification();
        }, 2000); 
      });
    } else {
      setTimeout(() => {
        this.clearNotification();
      }, 2000);
    }
  }

  clearNotification() {
    this.notificationMessage.next(null);
    this.notificationType.next(null);
  }
}
// function param(target: NotificationService, propertyKey: 'message'): void {
//   throw new Error('Function not implemented.');
// }

