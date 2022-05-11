import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesEntityNo, UserData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import {
  passwordMatcher,
  EMAIL_PATTERN,
  NAME_PATTERN,
  PASSWORD_MIN_LENGTH,
} from 'src/app/shared/utils/validation.fn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword = true;
  showConfirmedPassword = true;
  registrationForm: FormGroup | undefined;
  rolesEntityNo = RolesEntityNo;
  firebaseError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit() {
    this.registerFormGroup();
  }

  registerFormGroup() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(EMAIL_PATTERN),
        ],
      ],
      passwordGroup: this.formBuilder.group(
        {
          password: [
            '',
            [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: passwordMatcher }
      ),
      role: ['', Validators.required],
    });
  }

  onRegistration() {
    const firstName = this.registrationForm?.get('firstName')?.value;
    const lastName = this.registrationForm?.get('lastName')?.value;
    const email = this.registrationForm?.get('email')?.value;
    const password = this.registrationForm?.get(
      'passwordGroup.password'
    )?.value;
    const entityNo = this.registrationForm?.get('role')?.value;
    const userData: UserData = {
      entityNo: entityNo,
      firstName: firstName,
      lastName: lastName,
    };

    this.authService
      .register(email, password, JSON.stringify(userData))
      .subscribe({
        next: () => this.router.navigate(['login']),
        error: (error) => {
          this.firebaseError = this.formValidationService.firebaseErrorMessages(
            error.code
          );
        },
      });
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  getInputTypeConfirm() {
    if (this.showConfirmedPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }
}
