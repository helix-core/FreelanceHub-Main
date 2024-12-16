import { Component } from '@angular/core';
import { ClientService } from '../../client.service'; // Import your service
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-signup',
  templateUrl: './signupclient.component.html',
  styleUrl: './signupclient.component.css',
  standalone:false
})
export class SignupclientComponent {
  clientDTO = {
    compEmail: '',
    companyName: '',
    typeOfProject: '',
    companyDescription: '',
    repName: '',
    repDesignation: '',
    password: '',
  };

  agree:boolean=false;

  notificationMessage: string = '';
  notificationType: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  // ngOnInit() {
  //   // You can call a service method here to load any initial data if needed
  //   this.clientService.getClientFormData().subscribe(
  //     (data) => {
  //       // Here you can populate the form with data if required
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching form data', error);
  //     }
  //   );
  // }
  
  onSubmit() {
    this.clientService.registerClient(this.clientDTO).subscribe(
      response => {
        this.notificationMessage = 'Sign Up Successful!';
        this.notificationType = 'success';
        setTimeout(() => this.router.navigate(['/login'])); // Redirect to login page
      },
      error => {
        this.notificationMessage = 'Failed to register. Please try again.';
        this.notificationType = 'error';
      }
    );
  }
}
