import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service'; // Import your wallet service to interact with the backend
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: false,
  
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})

export class WalletComponent implements OnInit {
  userRole: string = '';
  userId:string ='';
  clientWalletBalance: number = 0;
  freelancerWalletBalance: number = 0;
  creditsToAdd: number=0;
  withdrawAmount: number=0;
  clientTransactions: any[] = [];
  freelancerTransactions: any[] = [];
  showAddCreditsModal: boolean = false;
  showWithdrawModal: boolean = false;
  showPieChart: boolean = true; // You can use chart.js for pie charts

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'client'; // Check role from local storage
    this.userId = localStorage.getItem('userId') || '';

    if (this.userRole === 'client') {
      this.getClientWalletInfo();
    } else if (this.userRole === 'freelancer') {
      this.getFreelancerWalletInfo();
    }
  }

  // Fetch wallet balance and transaction history for client
  getClientWalletInfo() {
    this.walletService.getWalletBalance(this.userId).subscribe(balance => {
      this.clientWalletBalance = balance;
    });
    this.walletService.getTransactionHistory(this.userId).subscribe(transactions => {
      this.clientTransactions = transactions;
    });
  }

  // Fetch wallet balance and transaction history for freelancer
  getFreelancerWalletInfo() {
    this.walletService.getWalletBalance(this.userId).subscribe(balance => {
      this.freelancerWalletBalance = balance;
    });
    this.walletService.getTransactionHistory(this.userId).subscribe(transactions => {
      this.freelancerTransactions = transactions;
    });
  }

  // Open modal for adding credits (client)
  openAddCreditsModal() {
    this.showAddCreditsModal = true;
  }

  closeAddCreditsModal() {
    this.showAddCreditsModal = false;
  }

  addCredits() {
    this.walletService.addCredits(this.userId, this.creditsToAdd).subscribe(response => {
      this.getClientWalletInfo(); // Refresh wallet info after adding credits
      this.closeAddCreditsModal();
    });
  }

  // Open modal for withdrawal request (freelancer)
  openWithdrawModal() {
    this.showWithdrawModal = true;
  }

  closeWithdrawModal() {
    this.showWithdrawModal = false;
  }

  // Request withdrawal (freelancer)
  requestWithdrawal() {
    this.walletService.requestWithdrawal(this.userId, this.withdrawAmount).subscribe(response => {
      this.getFreelancerWalletInfo(); // Refresh wallet info after withdrawal
      this.closeWithdrawModal();
    });
  }
}
