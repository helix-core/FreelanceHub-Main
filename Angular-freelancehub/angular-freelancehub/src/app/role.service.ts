import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // private apiUrl = 'http://localhost:8080/roles';
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(`${this.URL}/roles`);
  }
}
