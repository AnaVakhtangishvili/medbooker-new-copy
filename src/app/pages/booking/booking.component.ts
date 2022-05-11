import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AttendeeType,
  BookingRequest,
  Doctor,
} from 'src/app/models/api.models';
import { UserData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  user: UserData | undefined;
  chosenDoctor: Doctor | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getDoctorsEntity();
    this.user = this.authService.currentUser;
  }

  bookingHandler(date: Date) {
    this.createBooking(date);
  }

  getDoctorsEntity() {
    this.route.params.subscribe((params) => this.getChosenDoctor(params['id']));
  }

  getChosenDoctor(doctorsEntity: number) {
    if (doctorsEntity)
      this.doctorService
        .getDoctor(doctorsEntity)
        .subscribe((doctor) => (this.chosenDoctor = doctor));
  }

  createBooking(date: Date) {
    if (this.user && this.chosenDoctor) {
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
              entityNo: this.chosenDoctor?.entityNo,
              firstName: this.chosenDoctor?.firstName,
              lastName: this.chosenDoctor?.lastName,
            },
            entityNo: this.chosenDoctor?.entityNo,
          },
        ],
        organiser: this.user?.entityNo,
        startDate: date.toISOString(),
        endDate: new Date(date.getTime() + 30 * 60000).toISOString(),
      };

      this.bookingService.createBooking(newBooking).subscribe(() => this.router.navigate(['main/upcoming-consultations']));
    }
  }
}
