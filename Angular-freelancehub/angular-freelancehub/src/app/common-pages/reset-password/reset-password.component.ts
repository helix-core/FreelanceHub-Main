import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
   token!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.verifyToken(this.token);
      } else {
        // Handle missing token case (show error or navigate to a different page)
        console.error('Token is missing');
      }
    });
  }

  verifyToken(token: string): void {
  this.authService.verifyResetToken(token).subscribe(
    (response: any) => {
      console.log('Response from backend:', response);  // Add this log to verify the response

      if (response.redirectTo === 'client') {
        console.log('Navigating to client edit page');  // Log the navigation
        this.router.navigate(['/profile-client-edit', response.userId]);
      } else if (response.redirectTo === 'freelancer') {
        console.log('Navigating to freelancer edit page');  // Log the navigation
        this.router.navigate(['/freelancer/edit', response.userId]);
      } else {
        console.error('Invalid redirect response:', response);
      }
    },
    error => {
      if (error.status === 401) {
          // Token expired or invalid
          this.notificationService.showNotification('The reset link is no longer valid. Please request a new one.', 'error');
          this.router.navigate(['/login']);
        } else if (error.status === 404) {
          // User not found for the given token
          this.notificationService.showNotification('You have already used the link.', 'error');
          this.router.navigate(['/login']);
        } else {
          // Handle any other errors
          this.notificationService.showNotification('An error occurred. Please try again later.', 'error');
        }
    }
  );
}
}
