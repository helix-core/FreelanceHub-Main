import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../notification.service';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-bidding',
  standalone: false,
  
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.css'
})
export class BiddingComponent implements OnInit {
  jobsWithBids: any[] = [];
  sortBy: string = 'duration';
  showPaymentModal: boolean = false;
  selectedJobId: number | null = null;
  selectedFreelancerId: string | null = null;
  selectedBidAmount: number | null = null;
  showPasswordModal:boolean=false;
  password:string='';
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";

  constructor(private http: HttpClient,private notificationService: NotificationService,private walletService: WalletService) {}

  ngOnInit(): void {
    this.fetchJobsWithBids();
  }

  fetchJobsWithBids(): void {
    const userId=localStorage.getItem("userId");
    this.http.get(`${this.URL}/bidding`, { params: { sortBy: this.sortBy ,userId: userId || ''} }).subscribe(
      (response: any) => {
        this.jobsWithBids = Array.isArray(response.jobsWithBids) ? response.jobsWithBids : [];
      },
      (error) => {
        alert(error);
      }
    );
  }
  openPasswordModal(): void {
    this.showPasswordModal = true; // Open the password modal
    this.showPaymentModal=false;
  }

  sortBids(): void {
    this.fetchJobsWithBids();
  }

  // 
  acceptBid(jobId: number, userId: string, salary: number): void {
    // Calculate 30% of the salary
    const paymentAmount = salary * 0.3;
    this.selectedJobId = jobId;
    this.selectedFreelancerId = userId;
    this.selectedBidAmount =  Math.round(paymentAmount * 100) / 100;

    // Show the payment confirmation modal
    this.showPaymentModal = true;
  }

  confirmPayment(): void {
    const clientId = localStorage.getItem('userId'); // Client's user ID
    if (!this.selectedJobId || !this.selectedFreelancerId || !this.selectedBidAmount) return;

    this.walletService.getWalletBalance(clientId!).subscribe(
      (balance: number) => {
          this.http
          .post(`${this.URL}/verify-password`, { clientId, password: this.password }, { responseType: 'text' })
          .subscribe(
            (response: any) => {
        if (balance < this.selectedBidAmount!) {
          this.notificationService.showNotification('Insufficient balance. Please add funds.', 'error');
          this.closePaymentModal();
        } else {
          this.walletService
            .makePayment(clientId!, this.selectedFreelancerId!, this.selectedBidAmount!)
            .subscribe(
              (response: any) => {
                this.notificationService.showNotification(response, 'success');
                this.http
                  .post(`${this.URL}/acceptBid`, { jobId: this.selectedJobId, userId: this.selectedFreelancerId }, { responseType: 'text' })
                  .subscribe(
                    (acceptResponse) => {
                      this.notificationService.showNotification(acceptResponse, 'success');
                      this.fetchJobsWithBids(); 
                      this.closePaymentModal();
                    },
                    (error) => {
                      this.notificationService.showNotification('Error accepting bid.', 'error');
                      this.closePaymentModal();
                    }
                  );
              },
              (error) => {
                this.notificationService.showNotification('Error processing payment.', 'error');
                this.closePaymentModal();
              }
            );  
        }
      },(error) => {
        this.notificationService.showNotification('Incorrect password.', 'error');
      });
    },
      (error) => {
        this.notificationService.showNotification('Error fetching wallet balance.', 'error');
        this.closePaymentModal();
      }
    );
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedJobId = null;
    this.selectedFreelancerId = null;
    this.selectedBidAmount = null;
    if(this.showPasswordModal){
      this.showPasswordModal=false;
    }
  }
}
