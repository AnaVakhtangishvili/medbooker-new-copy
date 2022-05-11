import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { AttendeeType, BookingStatus, Doctor, UpcomingBooking } from 'src/app/models/api.models';
import { RolesEntityNo } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { flattenBookings } from 'src/app/shared/utils/helper.fn';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss']
})
export class HealthRecordsComponent implements OnInit {

  role = RolesEntityNo;
  status = BookingStatus;
  attendee = AttendeeType.provider;
  userRole: RolesEntityNo | undefined;
  pastBookings$: Observable<UpcomingBooking[]> | undefined;
  chosenBooking: UpcomingBooking | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private doctorservice: DoctorService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.currentUser.entityNo;
    this.getPastBookings();
  }

  getPastBookings() {
    if (this.userRole) {
      this.pastBookings$ = this.bookingService
        .getBookingsForEntity(this.userRole, '', new Date().toISOString())
        .pipe(
          map((bookings) =>
            flattenBookings(bookings)),
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
    this.pastBookings$?.pipe(map((bookings) => bookings.find((booking) => booking.id == bookingId)))
      .subscribe((booking) => {
        this.chosenBooking = booking;
      });
  }

}
