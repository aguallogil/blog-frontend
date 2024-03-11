import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError = false;
  constructor(private formBuilder: FormBuilder,
     private readonly authService:AuthService,
     private readonly router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      try {
        await this.authService.login(this.username?.value, this.password?.value);
        this.router.navigate(['/blog-entries']);
      } catch (error: any) {
        console.log('Login error:', error);
        if (error?.statusText === 'Internal Server Error') {
          this.errorMessage = 'Server error!';
        } else if (error?.statusText === 'Unauthorized') {
          this.errorMessage = 'Unauthorized access!';
        } else {
          // Handle generic or unknown errors
          this.errorMessage = 'Unknown login error. Please try again later.';
        }
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    }
  }
}
