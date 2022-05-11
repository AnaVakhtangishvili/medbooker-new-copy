import { AbstractControl } from "@angular/forms";

export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const NAME_PATTERN = '^[a-zA-Z ]+$';
export const PASSWORD_MIN_LENGTH = 8;

export function passwordMatcher(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value === confirmPassword?.value) {
    return null;
  }
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return { match: true };
}