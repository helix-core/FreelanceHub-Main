import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {


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
}