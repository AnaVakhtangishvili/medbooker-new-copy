import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Directive({
  selector: '[appFormErrorMessages]',
})
export class FormErrorMessagesDirective implements OnInit {
  @Input('formControlName') formControlName: string | undefined;
  errorMessageId = '';
  controlStatus: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private control: NgControl,
    private formVlidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.onContolStatusChange();
    this.trimControlValue();
  }

  onContolStatusChange() {
    this.errorMessageId = this.formControlName + '-error';
    if (this.control != null) {
      this.controlStatus = this.control?.statusChanges
        ?.pipe(debounceTime(1000))
        .subscribe((status) => {
          if (status === 'INVALID') {
            this.showError();
          } else {
            this.removeError();
          }
        });
    }
  }

  trimControlValue() {
    const targetControl = this.control.control;
    targetControl?.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if (value[0] == ' ' || value[value.length - 1] == ' ') {
        targetControl.setValue(value.trim());
      }
    });
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent(event: any) {
    if (this.control.value === null || this.control.value === '') {
      if (this.control.errors) {
        this.showError();
      } else {
        this.removeError();
      }
    }
  }

  private showError() {
    this.removeError();
    const validationErrors: ValidationErrors | any = this.control.errors;
    const firstErrorKey = Object.keys(validationErrors)[0];
    const errorMessageKey = this.formControlName + '-' + firstErrorKey;
    const errorMessage =
      this.formVlidationService.getValidationMsg(errorMessageKey);
    const errorSpan =
      '<span class="errorMessage" id="' +
      this.errorMessageId +
      '">' +
      errorMessage +
      '</span>';
    if (
      this.formControlName === 'password' ||
      this.formControlName === 'confirmPassword'
    ) {
      this.elementRef.nativeElement.parentElement.parentElement.insertAdjacentHTML(
        'beforeend',
        errorSpan
      );
      this.elementRef.nativeElement.parentElement.classList.add(
        'invalid-input'
      );
    } else {
      this.elementRef.nativeElement.parentElement.insertAdjacentHTML(
        'beforeend',
        errorSpan
      );
      this.elementRef.nativeElement.classList.add('invalid-input');
    }
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorMessageId);
    if (errorElement) {
      if (
        this.formControlName === 'password' ||
        this.formControlName === 'confirmPassword'
      ) {
        this.elementRef.nativeElement.parentElement.classList.remove(
          'invalid-input'
        );
      } else {
        this.elementRef.nativeElement.classList.remove('invalid-input');
      }
      errorElement.remove();
    }
  }
}
