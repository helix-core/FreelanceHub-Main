import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './models/job.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrlprofile = '/api/profile/client';
  private baseUrl = '/api/client';

  constructor(private http: HttpClient) {}

  getClientFormData(): Observable<any> {
    return this.http.get<any>('/api/signup/client');
  }
  
  registerClient(clientDTO: any): Observable<any> {
    return this.http.post<any>('/api/signup/client', clientDTO);
  }

  postJob(job: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    return this.http.post('/api/postjob', job,{ params });
  }

  getPostedJobs(): Observable<Job[]> {
    const userId= localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Job[]>('/api/posted-jobs',{params});
  }
   getClientProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlprofile}?userId=${userId}`);
  }
   getClientDetails(clientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${clientId}`);
  }

  updateClientDetails(updatedClient: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/edit`, updatedClient,{responseType:'text'});
}


}
