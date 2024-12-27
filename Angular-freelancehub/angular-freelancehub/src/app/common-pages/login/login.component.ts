import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  loginForm!: FormGroup;
  private URL = "http://freelancehub12.us-east-1.elasticbeanstalk.com/api";
  

  constructor(private http: HttpClient, private router: Router,private authService:AuthService,private fb:FormBuilder,private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.customEmailValidator()]],
      password: ['', [Validators.required]]
    });
  }
  // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in|edu|net)$/;
      const value = control.value;
      return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
    };
  }

  openResetPopup(event: Event) {
  event.preventDefault(); // Prevent page refresh on anchor click
  const popup = document.getElementById("resetPasswordPopup");
  if (popup) {
    popup.style.display = "flex";
  }
}

                 
 closeResetPopup() {
    const popup = document.getElementById("resetPasswordPopup");
    if (popup) {
      popup.style.display = "none"; // Hide the popup
    }
  }


   sendResetLink() {
    const resetEmail = (document.getElementById("resetEmail") as HTMLInputElement).value;
    if (!resetEmail) {
      alert('Please enter a valid email!');
      return;
    }

    // Make API call to send reset link
    this.http.post(`${this.URL}/reset-password`, { email: resetEmail },{ responseType: 'text' })
      .subscribe({
         next: (res) => this.notificationService.showNotification(res, 'success'),
    error: (err) => this.notificationService.showNotification('Error: ' + err.message, 'error')
      });
  }


  onLogin() {
    this.loginForm.markAllAsTouched();
      if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
}



}
