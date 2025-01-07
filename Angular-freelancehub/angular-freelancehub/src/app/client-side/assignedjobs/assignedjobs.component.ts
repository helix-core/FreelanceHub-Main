import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { RatingService } from '../../rating.service';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-assignedjobs',
  standalone: false,
  
  templateUrl: './assignedjobs.component.html',
  styleUrl: './assignedjobs.component.css'
})
export class AssignedjobsComponent implements OnInit {
  ongoingJobs: any[] = [];
  completedJobs: any[] = [];
  showPaymentDecisionPopup: boolean = false;
  selectedJob: any;
  selectedFreelancerId: string | null = null;
  selectedBidAmount: number | null = null;
  showPaymentModal: boolean = false;
  hoverJobId: string | null = null; 
  hoverStatId: string | null = null; 
  showPasswordModal:boolean=false;
  password:string='';
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";

  constructor(private http: HttpClient,private notificationService: NotificationService, private ratingService:RatingService, private walletService: WalletService) {}

  ngOnInit(): void {
    this.fetchAssignedJobs();
  }

 
  fetchAssignedJobs() {
    const userId= localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in. No userId found in localStorage.');
    }
    const params = new HttpParams().set('userId', userId);
    this.http.get(`${this.URL}/assigned-jobs`,{params}).subscribe(
      (response: any) => {
        this.ongoingJobs = response.ongoingJobs || [];
        this.completedJobs = response.completedJobs || [];
      },
      (error) => {
        console.error('Error fetching assigned jobs:', error);
      }
    );
  }
  hoverPayButton(job: any) {
    if (job.jobDetails.payment_stat === 'Unpaid') {
      this.hoverJobId = job.jobId;
    }
  }
  resetHover(): void {
    this.hoverJobId = null;
  }

  showPaymentConfirmation(job: any) {
    const paymentAmnt = job.salary * 0.7;
    this.selectedJob = job.jobDetails;
    this.selectedFreelancerId = job.freeId.freeId;
    this.selectedBidAmount =  Math.round(paymentAmnt * 100) / 100; 
    this.showPaymentModal = true;
  }

  closePayModal(): void {
    this.showPaymentModal = false;
    this.selectedJob= null;
    this.selectedFreelancerId = null;
    this.selectedBidAmount = null;
  }

  openPasswordModal(): void {
    this.showPasswordModal = true;
    this.showPaymentModal=false;
  }


  verifyProject(job: any, salary: number): void {
    console.log('Job ID:', job.id);
    if (!job.id) {
      console.error('Job ID is undefined or null');
      return;
    }
  
    const paymentAmnt = salary * 0.7;
    this.selectedJob = job;
    this.selectedFreelancerId = job.freeId.freeId;
    this.selectedBidAmount =  Math.round(paymentAmnt * 100) / 100;
    this.showPaymentDecisionPopup = true;
  }
  

  confirmPayment(isPayNow: boolean): void {
    const clientId = localStorage.getItem('userId'); 
    if (!this.selectedJob.id || !this.selectedFreelancerId || !this.selectedBidAmount) {
      console.log('Missing details:', this.selectedJob.id, this.selectedFreelancerId, this.selectedBidAmount);
      return;
    }
    
    this.walletService.getWalletBalance(clientId!).subscribe(
      (balance: number) => {
        if (isPayNow) {
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
                  this.updateJob('completed', 'Paid'); 
                  this.notificationService.showNotification('Project verified successfully! Payment Closed!', 'success');
                  this.ratingService.openRatingPopup(this.selectedJob!);
                  this.closePaymentModal();
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
      } else {
          this.updateJob('completed', 'Unpaid'); 
          this.notificationService.showNotification('Project verified successfully! Payment Pending!', 'success');
          this.closePaymentModal();
        }
      },
      (error) => {
        this.notificationService.showNotification('Error fetching wallet balance.', 'error');
        this.closePaymentModal();
      }
  );
  }
  

  updateJob(progress: string, paymentStatus: string): void {
    const requestData = {
      jobId: this.selectedJob.id,
      progress: progress,
      paymentStatus: paymentStatus,
    };
  
 
    this.http.post(`${this.URL}/update-job`, requestData, { responseType: 'text' }).subscribe(
      (response) => {
        this.fetchAssignedJobs(); 
      },
      (error) => {
        this.notificationService.showNotification('Error updating job.', 'error');
      }
    );
  }
  
  closePaymentModal(): void {
    this.showPaymentDecisionPopup = false;
    this.showPaymentModal=false;
    this.selectedJob = null;
    this.selectedFreelancerId = null;
    this.selectedBidAmount = null;
    this.showPasswordModal=false;
  }


  get showPaymentDecision(): boolean {
    return this.showPaymentDecisionPopup;
  }

  closePayPopup(): void {
    this.showPaymentDecisionPopup = false;
  }


  get showRatingPopup(): boolean {
    return this.ratingService.showRatingPopup;
  }

  get rating(): number {
    return this.ratingService.rating;
  }

  rateFreelancer(star: number): void {
    this.ratingService.rateFreelancer(star); 
  }

  submitRating(): void {
    this.ratingService.submitRating();
  }

  closePopup(): void {
    this.ratingService.closePopup(); 
  }


}
