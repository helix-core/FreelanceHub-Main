import { Component } from '@angular/core';
import { ClientService } from '../../client.service'; // Import your service
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-client-signup',
  templateUrl: './signupclient.component.html',
  styleUrl: './signupclient.component.css',
  standalone:false
})
export class SignupclientComponent {

    signupForm!: FormGroup;

     constructor(private clientService: ClientService, private router: Router,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
    compEmail: ['',[Validators.required,this.customEmailValidator()]],
    companyName: ['',[Validators.required,Validators.minLength(3)]],
    typeOfProject: ['',Validators.required],
    companyDescription: ['',Validators.required],
    repName: ['',Validators.required],
    repDesignation: ['',Validators.required],
    password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/)]],
    confirmPassword: ['',Validators.required],
    agree:[false,Validators.requiredTrue] 
  },
  {
    validators: this.passwordMatchValidator
  });
}

  // agree: boolean = false;

  // notificationMessage: string = '';
  // notificationType: string = '';

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu)$/;
      const value = control.value;
      return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
    };
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };


  onSubmit() {
    // if (signupForm.invalid || this.clientDTO.password !== this.clientDTO.confirmPassword || !this.agree) {
    //   this.notificationMessage = 'Please correct the errors before submitting.';
    //   this.notificationType = 'error';
    //   return;
    // }
    const formData = { ...this.signupForm.value };
    this.clientService.registerClient(formData).subscribe(
      response => {
        console.log('Client Registered Successfully', response);
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400 && error.error) {
          Object.keys(error.error).forEach(field => {
            const control = this.signupForm.get(field);
            if (control) {
              control.setErrors({ serverError: error.error[field] });
            }
          });
        }
      }
    );
  
  }
}