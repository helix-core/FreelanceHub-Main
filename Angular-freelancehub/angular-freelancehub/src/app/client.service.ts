import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './models/job.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";

  constructor(private http: HttpClient) {}

  getClientFormData(): Observable<any> {
    return this.http.get<any>(`${this.URL}/signup/client`);
  }
  
  registerClient(formData: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/signup/client`, formData);
  }

  postJob(job: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    return this.http.post(`${this.URL}/postjob`, job,{ params });
  }

  getPostedJobs(): Observable<Job[]> {
    const userId= localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Job[]>(`${this.URL}/posted-jobs`,{params});
  }
   getClientProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/profile/client?userId=${userId}`);
  }
   getClientDetails(clientId: string): Observable<any> {
    return this.http.get(`${this.URL}/client/edit/${clientId}`);
  }

  updateClientDetails(updatedClient: any): Observable<any> {
  return this.http.post(`${this.URL}/client/edit`, updatedClient,{responseType:'text'});
}


}
