import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-explore',
  standalone: false,
  
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit{
  searchQuery: string = '';
  jobs: any[] = [];
  role: string | null = '';
  userId: string | null = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    try {
      // Safely access window and localStorage only when available
      if (typeof window !== 'undefined' && window.localStorage) {
        this.role = this.authService.getRole();
        this.userId = localStorage.getItem('userId');
      } else {
        console.warn('localStorage is not available.');
      }

      // Handle missing values with warnings
      if (!this.role) {
        console.warn('Role is not found in localStorage. Ensure it is set correctly.');
        this.role = ''; // Default role or handle it based on your application's logic
      }
      if (!this.userId) {
        console.warn('User ID is not found in localStorage. Ensure it is set correctly.');
        // Optionally redirect to login if the user is not authenticated
        this.handleUserNotLoggedIn();
        return;
      }

      // Fetch all jobs if everything is in place
      this.fetchAllJobs();
    } catch (error) {
      // Handle unexpected errors
      console.error('Error during initialization:', error);
      this.handleError('An error occurred. Please try again.');
    }
  }

  performSearch(): void {
    if (this.searchQuery.trim()) {
      this.http
        .get<any>(`api/search?query=${encodeURIComponent(this.searchQuery)}&userId=${this.userId}`)
        .subscribe(
          (response) => {
            this.jobs = response.jobs;
          },
          (error) => {
            console.error('Error while searching jobs:', error);
            this.handleError('No matching jobs found.');
          }
        );
    } else {
      this.fetchAllJobs();
    }
  }

  fetchAllJobs(): void {
    this.http
      .get<any>(`api/search?query=&userId=${this.userId}`)
      .subscribe(
        (response) => {
          this.jobs = response.jobs;
        },
        (error) => {
          console.error('Error while fetching all jobs:', error);
          this.handleError('No jobs found.');
        }
      );
  }

  private handleError(message: string): void {
    console.error(message);
    // Optionally, display an alert for the error message (ensure alert is only called in browser)
    if (typeof window !== 'undefined') {
      alert(message);
    }
  }

  private handleUserNotLoggedIn(): void {
    console.warn('User is not logged in.');
    // Optionally display a message or redirect to the login page
    if (typeof window !== 'undefined') {
      alert('You are not logged in. Redirecting to login page.');
    }
    // Redirect logic can be implemented here (e.g., using Angular Router)
    // this.router.navigate(['/login']);
  }
}

