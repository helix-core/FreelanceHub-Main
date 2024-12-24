import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WalletService {
  private baseUrl = '/api/payment';  // Your backend API endpoint

  constructor(private http: HttpClient) { }

  getWalletBalance(userId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance/${userId}`);
  }

  getTransactionHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions/${userId}`);
  }

  addCredits(clientId: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCredits/${clientId}`, null, {
      params: { amount: amount.toString() },
      responseType: 'text' 
    });
  }

  makePayment(clientId: string, freelancerId: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/pay/${clientId}/${freelancerId}`, null, {
      params: { amount: amount.toString() },
      responseType:'text'
    });
  }

  requestWithdrawal(freelancerId: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/withdraw/${freelancerId}`, null, {
      params: { amount: amount.toString() },
      responseType: 'text'
    });
  }
}
