import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RolesEntityNo } from './models/user.models';
import { BookingComponent } from './pages/booking/booking.component';
import { ConsultationRequestsComponent } from './pages/consultation-requests/consultation-requests.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { SearchComponent } from './pages/search/search.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { MainComponent } from './shell/main/main.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'booking/:id',
        component: BookingComponent,
        canActivate: [RoleGuard],
        data: { 
          role: RolesEntityNo.patient
        }
      },
      {
        path: 'consultation-requests',
        component: ConsultationRequestsComponent,
        canActivate: [RoleGuard],
        data: { 
          role: RolesEntityNo.doctor
        }
      },
      {
        path: 'health-records',
        component: HealthRecordsComponent,
        canActivate: [RoleGuard],
        data: { 
          role: RolesEntityNo.patient
        }
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [RoleGuard],
        data: { 
          role: RolesEntityNo.doctor
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [RoleGuard],
        data: { 
          role: RolesEntityNo.patient
        }
      },
      {
        path: 'upcoming-consultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
