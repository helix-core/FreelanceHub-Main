import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api'; // Adjust to your backend URL

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

  login(email: string, password: string) {
    const loginData = { email, password };

    this.http.post<any>(`${this.apiUrl}/login`, loginData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          // Store user data in localStorage/sessionStorage
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('userRole', response.role); // client, freelancer, etc.
            localStorage.setItem('userId', response.userId); // Set the user ID
          }
          this.notificationService.showNotification(response.message, 'success', '/landing');
          // alert('Login Successful!');
          // this.router.navigate(['/landing']); // Redirect to a dashboard or landing page
        } else {
          // alert(response.message);
          this.notificationService.showNotification(response.message, 'error');
        }
      },
      error: (error) => {
        this.notificationService.showNotification('An error occurred during login.', 'error');
        // alert('An error occurred during login.');
      }
    });
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    // Check if 'window' and 'localStorage' are available before accessing it
    return typeof window !== 'undefined' && localStorage ? !!localStorage.getItem('userRole') : false;
  }

  // Get current user role
  getUserRole(): string | null {
    // Check if 'window' is available and 'localStorage' is accessible
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('userRole');
    } else {
      console.warn('localStorage is not available in this environment.');
      return null; // Return a default fallback value
    }
  }

  // Logout the user
  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
    this.notificationService.showNotification('Successfully logged out', 'success', '/login');
  }

  getRole(): string | null {
    // Check if 'window' and 'localStorage' are available before accessing it
    return typeof window !== 'undefined' && localStorage ? localStorage.getItem('userRole') : null;
  }

  getUserId(): string | null {
    // Check if 'window' and 'localStorage' are available before accessing it
    return typeof window !== 'undefined' && localStorage ? localStorage.getItem('userId') : null;
  }

   verifyResetToken(token: string): Observable<any> {
    return this.http.get<any>(`/api/verify-reset-password?token=${token}`);
  }
}
