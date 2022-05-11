import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {

  constructor() {}

  validationErrorObj: { [key: string]: string } = {
    'firstName-required': 'Please enter your name',
    'firstName-pattern': 'Name should contain only letters',

    'lastName-required': 'Please enter your lastname',
    'lastName-pattern': 'Lastname should contain only letters',

    'email-required': 'Please enter your email',
    'email-pattern': 'Please enter a valid email address',
    'email-email': 'Please enter a valid email address',

    'password-required': 'Please enter your password',
    'password-minlength': 'Password must contain at least 8 character ',

    'confirmPassword-required': 'Please confirm your password',

    'role-required': 'Please select your role',
  };

  getValidationMsg(validationId: string): string {
    return this.validationErrorObj[validationId];
  }

  firebaseErrorMessages(firebaseError: string) {
    switch (firebaseError) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';

      case 'auth/user-not-found':
        return "An account with this email doesn't exists";

      case 'auth/wrong-password':
        return "Wrong password";

      default:
        return "";
    }
  }
}