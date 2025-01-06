import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { Router } from '@angular/router';
import { ChartConfiguration,ChartOptions } from 'chart.js';
import { NotificationService } from '../../notification.service';
import {format} from 'date-fns';

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
  monthlySpendingData: any = [];
  monthlySpendingLabels: string[] = [];
  monthlySpendingValues: number[] = [];
  monthlyEarningData: any = [];
  monthlyEarningLabels: string[] = [];
  monthlyEarningValues: number[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Weekly Transactions',
        fill: 'origin',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  constructor(private walletService:WalletService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'client'; 
    this.userId = localStorage.getItem('userId') || '';

    if (this.userRole === 'client') {
      this.getClientWalletInfo();
      this.getMonthlySpendingData();
      this.getDailyTransactionVol();
    } else if (this.userRole === 'freelancer') {
      this.getFreelancerWalletInfo();
      this.getMonthlyEarningData();
      this.getDailyTransactionVol();
    }
  }

  getClientWalletInfo() {
    this.walletService.getWalletBalance(this.userId).subscribe(balance => {
      this.clientWalletBalance = balance;
    });
    this.walletService.getTransactionHistory(this.userId).subscribe(transactions => {
      this.clientTransactions = transactions;
    });
  }

  getFreelancerWalletInfo() {
    this.walletService.getWalletBalance(this.userId).subscribe(balance => {
      this.freelancerWalletBalance = balance;
    });
    this.walletService.getTransactionHistory(this.userId).subscribe(transactions => {
      this.freelancerTransactions = transactions;
    });
  }

  openAddCreditsModal() {
    this.showAddCreditsModal = true;
  }

  closeAddCreditsModal() {
    this.showAddCreditsModal = false;
  }

  addCredits() {
    this.walletService.addCredits(this.userId, this.creditsToAdd).subscribe(response => {
      this.getClientWalletInfo();
      this.closeAddCreditsModal();
      this.notificationService.showNotification("Credit Added Successfully!", 'success',);
    });
  }

  openWithdrawModal() {
    this.showWithdrawModal = true;
  }

  closeWithdrawModal() {
    this.showWithdrawModal = false;
  }


  requestWithdrawal() {
    this.walletService.requestWithdrawal(this.userId, this.withdrawAmount).subscribe(response => {
      this.getFreelancerWalletInfo(); 
      this.closeWithdrawModal();
      this.notificationService.showNotification("Amount withdraw successful!", 'success');
    },error=>{
      this.notificationService.showNotification("Withdrawal failed! Insufficient fund!", 'error',);
    }
    );
  }
  getMonthlySpendingData() {
    this.walletService.getMonthlySpending(this.userId).subscribe((data: any) => {
      this.monthlySpendingLabels = Object.keys(data); 
      this.monthlySpendingValues = Object.values(data); 
      this.preparePieChart();
    });
  }

  getMonthlyEarningData() {
    this.walletService.getMonthlyEarnings(this.userId).subscribe((data: any) => {
      this.monthlyEarningLabels = Object.keys(data); 
      this.monthlyEarningValues = Object.values(data); 
      this.prepareFreelancerPieChart();
    });
  }

  getDailyTransactionVol(){
    this.walletService.getDailyTransactionVolume(this.userId).subscribe((data) => {
      const dates = Object.keys(data).sort(); 
      const formattedDates=dates.map(date => format(new Date(date), 'MMM dd')); 
      const counts = dates.map((date) => data[date]);

      this.lineChartData.labels = formattedDates;
      this.lineChartData.datasets[0].data = counts;
      this.lineChartData = {
        ...this.lineChartData,
        labels: formattedDates,
        datasets: [{
          ...this.lineChartData.datasets[0],
          data: counts
        }]
      };
    });
  }
  
  preparePieChart() {
    this.monthlySpendingData = {
      labels: this.monthlySpendingLabels,
      datasets: [
        {
          data: this.monthlySpendingValues,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  }
  prepareFreelancerPieChart() {
    this.monthlyEarningData = {
      labels: this.monthlyEarningLabels,
      datasets: [
        {
          data: this.monthlyEarningValues,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  }

}
