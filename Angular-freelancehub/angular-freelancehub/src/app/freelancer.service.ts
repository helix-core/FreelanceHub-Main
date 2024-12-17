import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private apiUrl = '/api/profile/freelancer'; // Update with the correct endpoint
  private apiUrledit = '/api/freelancer';

  constructor(private http: HttpClient) { }

  registerFreelancer(formData: any): Observable<any> {
    return this.http.post('/api/signup/freelancer', formData)
    // .pipe(
    //   tap((response: any) => {
    //     if (response.token) {
    //       // Store the token for future use
    //       localStorage.setItem('authToken', response.token);
    //     }
    //   })
    // );
  }
  getFreelancerProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?userId=${userId}`);
  }
  getFreelancerDetails(freelancerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrledit}/edit/${freelancerId}`);
  }

  updateFreelancer(freelancer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrledit}/update`, freelancer);
  }
}