import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  providers: [AuthService, FormValidationService],
})
export class AuthModule {}
