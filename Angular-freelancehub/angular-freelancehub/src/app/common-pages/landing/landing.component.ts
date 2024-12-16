import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: false,
  
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  userRole: string | null = null;
  notifications: { message: string }[] = [];
  unreadCount: number = 0;
  dropdownVisible: boolean = false;
  profileDropdownVisible: boolean = false;

  constructor(private authService: AuthService,private http:HttpClient) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
     this.getNotifications();
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (this.dropdownVisible && this.unreadCount > 0) {
      this.markNotificationsAsRead();
    }
  }

  toggleProfileDropdown() {
    this.profileDropdownVisible = !this.profileDropdownVisible;
  }

  getNotifications() {
    this.http.get<{ notifications: { message: string }[]; unreadCount: number }>('/getUnreadNotifications')
      .subscribe(
        (data) => {
          this.notifications = data.notifications || [];
          this.unreadCount = data.unreadCount || 0;
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );
  }

  markNotificationsAsRead() {
    this.http.post('/markNotificationsAsRead', {}).subscribe(
      () => {
        this.unreadCount = 0;
      },
      (error) => {
        console.error('Error marking notifications as read:', error);
      }
    );
  }
  handleLogout(): void {
    this.authService.logout(); // Call the logout function in the service
  }
}

