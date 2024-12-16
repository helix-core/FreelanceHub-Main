import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
