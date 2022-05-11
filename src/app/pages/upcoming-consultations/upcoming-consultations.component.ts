import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import {
  AttendeeType,
  BookingStatus,
  Doctor,
  UpcomingBooking,
} from 'src/app/models/api.models';
import { RolesEntityNo } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { flattenBookings } from 'src/app/shared/utils/helper.fn';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent implements OnInit {
  role = RolesEntityNo;
  status = BookingStatus;
  attendee: AttendeeType | undefined;
  userRole: RolesEntityNo | undefined;
  upcomingBookings$: Observable<UpcomingBooking[]> | undefined;
  chosenBooking: UpcomingBooking | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private doctorservice: DoctorService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.currentUser.entityNo;
    this.getUpcomingBookings();
    this.attendeeForCardName();
  }

  getUpcomingBookings() {
    if (this.userRole) {
      this.upcomingBookings$ = this.bookingService
        .getBookingsForEntity(this.userRole, new Date().toISOString())
        .pipe(
          map((bookings) =>
            flattenBookings(bookings)
              .filter((element) => element.status == BookingStatus.confirmed)
              .sort(
                (a, b) =>
                  Number(new Date(a.startTime)) - Number(new Date(b.startTime))
              )
          ),
          switchMap((bookings) => {
            if (this.userRole == RolesEntityNo.doctor) {
              return of(bookings);
            }
            return this.doctorservice.getDoctors().pipe(
              map((doctors) => {
                return bookings.map((booking) => {
                  const doctorsEntityNo = booking.attendees.find(
                    (attendee) => attendee.attendeeType == AttendeeType.provider
                  )?.entityNo;
                  return {
                    ...booking,
                    practiceName: doctors.find(
                      (doctor) => doctor.entityNo == doctorsEntityNo
                    )?.practiceName,
                  };
                });
              })
            );
          }),
        );
    }
  }

  onCardClickHandler(bookingId: number) {
    this.upcomingBookings$?.pipe(map((bookings) => bookings.find((booking) => booking.id == bookingId)))
      .subscribe((booking) => {
        this.chosenBooking = booking;
      });
  }

  cancellationHandler(bookingId: number) {
    const body = {
      bookingStatus: this.status.cancelled,
    };
    this.bookingService
      .updateBookingStatus(bookingId, body)
      .subscribe(() => {
        this.getUpcomingBookings();
        this.chosenBooking = undefined;
      });
  }

  attendeeForCardName() {
    if (this.userRole == RolesEntityNo.doctor) {
      this.attendee = AttendeeType.patient;
    } else {
      this.attendee = AttendeeType.provider;
    }
  }
}
