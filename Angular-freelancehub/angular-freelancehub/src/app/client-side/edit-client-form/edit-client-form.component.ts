import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
   constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private notificationService : NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Fetch client details using userId from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.clientService.getClientDetails(userId).subscribe((client) => {
        this.editClientForm.patchValue(client);
      });
    }
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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu)$/;
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
  if (this.editClientForm.valid) {
    const updatedClient = this.editClientForm.value;
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (userId) {
      updatedClient.userId = userId; // Add userId to the request body
      this.clientService.updateClientDetails(updatedClient).subscribe(
        () => {
          this.notificationService.showNotification('Profile edited successfully!', 'success', '/profile-client'); // Redirect to the profile page

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


