import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private configService: ConfigService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.errorMessage = null;
      axios.post('/api/User/SignIn', { username: email, password })
        .then(response => {
          if (response.data.token) {
            this.router.navigate(['/home']);
          } else {
           this.errorMessage = 'Invalid credentials';
          }
        })
        .catch(error => {
          this.errorMessage = 'Invalid credentials';
          console.error('There was an error!', error);
        });
    }
  }
}
