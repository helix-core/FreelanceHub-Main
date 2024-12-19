import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';

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
      compEmail: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      typeOfProject: ['', Validators.required],
      companyDescription: ['', Validators.required],
      repName: ['', Validators.required],
      repDesignation: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  updateClient(): void {
  if (this.editClientForm.valid) {
    const updatedClient = this.editClientForm.value;
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    if (userId) {
      updatedClient.userId = userId; // Add userId to the request body
      this.clientService.updateClientDetails(updatedClient).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/profile/client']); // Redirect to the profile page
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      );
    } else {
      alert('User ID not found!');
    }
  }
}
}


