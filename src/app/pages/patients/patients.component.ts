import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import {
  AttendeeType,
  BookingRequest,
  Patient,
} from 'src/app/models/api.models';
import { UserData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  user: UserData | undefined;
  patientsForm: FormGroup | undefined;
  patients$: Observable<Patient[]> | undefined;
  chosenPatient: Patient | undefined;
  showCalendar = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.createPatientsForm();
    this.getAllPatients();
    this.searchPatients();
  }

  createPatientsForm() {
    this.patientsForm = this.formBuilder.group({
      patientsName: [''],
      patientsLastname: [''],
    });
  }

  getAllPatients() {
    this.patients$ = this.patientService.getPatients();
  }

  searchPatients() {
    this.patientsForm?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(({ patientsName, patientsLastname }) => {
        this.patients$ = this.patientService.searchPatient(
          patientsName,
          patientsLastname
        );
        if (!(patientsName || patientsLastname)) {
          this.getAllPatients();
        }
      });
  }

  getChosenPatient(patientEntityNo: number) {
    this.patientService.getPatient(patientEntityNo).subscribe((patient) => {
      this.chosenPatient = patient;
      console.log(patient);
    });
    this.showCalendar = true;
  }

  appointmentCreationHandler(date: Date) {
    this.createAppointment(date);
    this.showCalendar = false;
  }

  createAppointment(date: Date) {
    if (this.user && this.chosenPatient) {
      const newBooking: BookingRequest = {
        attendees: [
          {
            attendeeType: AttendeeType.patient,
            entity: {
              entityNo: this.user?.entityNo,
              firstName: this.user?.firstName,
              lastName: this.user?.lastName,
            },
            entityNo: this.user?.entityNo,
          },
          {
            attendeeType: AttendeeType.provider,
            entity: {
              entityNo: this.chosenPatient?.entityNo,
              firstName: this.chosenPatient?.firstName,
              lastName: this.chosenPatient?.lastName,
            },
            entityNo: this.chosenPatient?.entityNo,
          },
        ],
        organiser: this.user?.entityNo,
        startDate: date.toISOString(),
        endDate: new Date(date.getTime() + 30 * 60000).toISOString(),
      };

      console.log(newBooking)

    }
  }
}
