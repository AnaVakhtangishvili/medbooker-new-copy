import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { EMAIL_PATTERN, PASSWORD_MIN_LENGTH } from 'src/app/shared/utils/validation.fn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  showPassword = false;
  firebaseError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formValidationService: FormValidationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.logInFormGroup();
  }

  logInFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(EMAIL_PATTERN),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)]],
    });
  }

  onLogin() {
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;

    this.authService.signIn(email, password).subscribe({
      next: () => this.router.navigate(['main/dashboard']),
      error: (error) => {
        this.firebaseError = this.formValidationService.firebaseErrorMessages(error.code)
      }
    });
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
