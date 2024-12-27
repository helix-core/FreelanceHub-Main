import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WalletService {
 
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api"

  constructor(private http: HttpClient) { }

  getWalletBalance(userId: string): Observable<number> {
    return this.http.get<number>(`${this.URL}/payment/balance/${userId}`);
  }

  getTransactionHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/payment/transactions/${userId}`);
  }

  addCredits(clientId: string, amount: number): Observable<any> {
    return this.http.post(`${this.URL}/payment/addCredits/${clientId}`, null, {
      params: { amount: amount.toString() },
      responseType: 'text' 
    });
  }

  makePayment(clientId: string, freelancerId: string, amount: number): Observable<any> {
    return this.http.post(`${this.URL}/payment/pay/${clientId}/${freelancerId}`, null, {
      params: { amount: amount.toString() },
      responseType:'text'
    });
  }

  requestWithdrawal(freelancerId: string, amount: number): Observable<any> {
    return this.http.post(`${this.URL}/payment/withdraw/${freelancerId}`, null, {
      params: { amount: amount.toString() },
      responseType: 'text'
    });
  }

  getMonthlySpending(clientId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/payment/monthlySpending/${clientId}`);
  }

  getMonthlyEarnings(freelancerId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/payment/monthlyEarnings/${freelancerId}`);
  }

  getDailyTransactionVolume(userId: string) {
    return this.http.get<{ [date: string]: number }>(`${this.URL}/payment/transactions/daily-volume/${userId}`);
  }
  
}
