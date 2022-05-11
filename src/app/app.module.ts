import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ShellModule } from './shell/shell.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { HealthRecordsComponent } from './pages/health-records/health-records.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';
import { ConsultationRequestsComponent } from './pages/consultation-requests/consultation-requests.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BASE_URL, GOOGLE_MAP_API_KEY } from './shared/utils/tokens.fn';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UpcomingConsultationsCardComponent } from './components/upcoming-consultations-card/upcoming-consultations-card.component';
import { CancelBookingCardComponent } from './components/cancel-booking-card/cancel-booking-card.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookingComponent,
    ConsultationRequestsComponent,
    DashboardComponent,
    HealthRecordsComponent,
    PatientsComponent,
    SearchComponent,
    UpcomingConsultationsComponent,
    BookingCardComponent,
    DoctorCardComponent,
    GoogleMapComponent,
    CalendarComponent,
    UpcomingConsultationsCardComponent,
    CancelBookingCardComponent,
    PatientCardComponent,
    NgxSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    SharedModule,
    ShellModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAP_API_KEY
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, BookingService, PatientService, DoctorService, {provide: BASE_URL, useValue: environment.baseUrl}],
  bootstrap: [AppComponent],
})
export class AppModule {}
