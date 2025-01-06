import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api"

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

  login(email: string, password: string) {
    const loginData = { email, password };

    this.http.post<any>(`${this.URL}/login`, loginData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('userRole', response.role); 
            localStorage.setItem('userId', response.userId); 
          }
          this.notificationService.showNotification(response.message, 'success', '/landing');
        } else {
          this.notificationService.showNotification(response.message, 'error');
        }
      },
      error: (error) => {
        this.notificationService.showNotification('An error occurred during login.', 'error');
      }
    });
  }

  
  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && localStorage ? !!localStorage.getItem('userRole') : false;
  }

  
  getUserRole(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('userRole');
    } else {
      console.warn('localStorage is not available in this environment.');
      return null;
    }
  }

  
  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
    this.notificationService.showNotification('Successfully logged out', 'success', '/login');
  }

  getRole(): string | null {
    return typeof window !== 'undefined' && localStorage ? localStorage.getItem('userRole') : null;
  }

  getUserId(): string | null {
    return typeof window !== 'undefined' && localStorage ? localStorage.getItem('userId') : null;
  }

   verifyResetToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/verify-reset-password?token=${token}`);
  }
}
