import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FreelancerJob } from './models/freelancer-job.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";
  
  constructor(private http: HttpClient) { }

  registerFreelancer(formData: any): Observable<any> {
    return this.http.post(`${this.URL}/signup/freelancer`, formData)
  }
  getFreelancerProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/profile/freelancer?userId=${userId}`);
  }
  getFreelancerDetails(freelancerId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/freelancer/edit/${freelancerId}`);
  }

  updateFreelancer(freelancer: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/freelancer/update`, freelancer);
  }


  getAppliedJobs(): Observable<FreelancerJob[]> {
    
    if (typeof window === 'undefined' || !localStorage) {
      console.warn('localStorage is not available in this environment.');
    }
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }

    const params = new HttpParams().set('userId', userId);
    return this.http.get<FreelancerJob[]>(`${this.URL}/applied-jobs`, { params });
  }

  getAcceptedJobs(): Observable<FreelancerJob[]> {

    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }

    const params = new HttpParams().set('userId', userId);
    return this.http.get<FreelancerJob[]>(`${this.URL}/accepted-jobs`, { params });
  }
}
