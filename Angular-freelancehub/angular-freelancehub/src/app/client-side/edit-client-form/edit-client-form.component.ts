import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../client.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-edit-client-form',
  standalone: false,
  
  templateUrl: './edit-client-form.component.html',
  styleUrl: './edit-client-form.component.css'
})
export class EditClientFormComponent implements OnInit {
  editClientForm!: FormGroup;
   userId: string | null = null;
   constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private notificationService : NotificationService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Fetch client details using userId from localStorage
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || localStorage.getItem('userId');
    if (this.userId) {
      this.clientService.getClientDetails(this.userId).subscribe((client) => {
        this.editClientForm.patchValue(client);
      });
    }
  });
  }

  initializeForm(): void {
    this.editClientForm = this.fb.group({
      compEmail: ['', [Validators.required, this.customEmailValidator()]],
      companyName: ['', Validators.required],
      typeOfProject: ['', Validators.required],
      companyDescription: ['', Validators.required],
      repName: ['', Validators.required],
      repDesignation: ['', Validators.required],
       password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    },{
      validators: this.passwordMatchValidator
    });
  }

    customEmailValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu|net)$/;
        const value = control.value;
        return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
      };
    }

   passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  updateClient(): void {
    this.editClientForm.markAllAsTouched();
  if (this.editClientForm.valid) {
    const updatedClient = this.editClientForm.value;
    if (this.userId) {
      updatedClient.userId = this.userId; // Add userId to the request body
      this.clientService.updateClientDetails(updatedClient).subscribe(
        () => {
           if (localStorage.getItem('userId')) {
            // Redirect to profile page if userId is in localStorage
            this.notificationService.showNotification('Profile edited successfully!', 'success', '/profile/client');
          } else {
            // Redirect to login page if userId is not in localStorage
            this.notificationService.showNotification('Password reset successfully! Please log in.', 'success', '/login');
          }

        },
        (error) => {
          this.notificationService.showNotification(error, 'error');
        }
      );
    } else {
      alert('User ID not found!');
    }
  }
}
}


