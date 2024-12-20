import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router,private authService:AuthService,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.customEmailValidator()]],
      password: ['', [Validators.required]]
    });
  }
  // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const value = control.value;
      return value && !emailRegex.test(value) ? { invalidEmail: true } : null;
    };
  }


  onLogin() {
      if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
}

}
