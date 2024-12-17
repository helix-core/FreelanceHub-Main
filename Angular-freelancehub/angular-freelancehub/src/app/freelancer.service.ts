import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FreelancerJob } from './models/freelancer-job.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private apiUrl = '/api/signup/freelancer';
  private apiUrljob = '/api/applied-jobs';
  private acceptedJobsUrl = '/api/accepted-jobs';
  
  constructor(private http: HttpClient) { }

  registerFreelancer(formData: any): Observable<any> {
    return this.http.post('/api/signup/freelancer', formData)
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  getAppliedJobs(): Observable<FreelancerJob[]> {
    if (!this.isBrowser()) {
      throw new Error('localStorage is not available in this context.');
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }

    const params = new HttpParams().set('userId', userId);
    return this.http.get<FreelancerJob[]>(this.apiUrljob, { params });
  }

  getAcceptedJobs(): Observable<FreelancerJob[]> {
    if (!this.isBrowser()) {
      throw new Error('localStorage is not available in this context.');
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }

    const params = new HttpParams().set('userId', userId);
    return this.http.get<FreelancerJob[]>(this.acceptedJobsUrl, { params });
  }
}
