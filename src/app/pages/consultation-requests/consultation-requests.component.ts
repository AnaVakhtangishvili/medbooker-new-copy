import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking, BookingStatus, BookingStatusUpdateRequest } from 'src/app/models/api.models';
import { RolesEntityNo } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { flattenBookings } from 'src/app/shared/utils/helper.fn';

@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.scss']
})
export class ConsultationRequestsComponent implements OnInit {

  userRole: RolesEntityNo | undefined;
  bookings$: Observable<Booking[]> | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.currentUser.entityNo;
    this.getBookings();
  }

  getBookings() {
    if (this.userRole) {
      this.bookings$ = this.bookingService
        .getBookingsForEntity(this.userRole, new Date().toISOString())
        .pipe(
          map((bookings) =>
            flattenBookings(bookings)
              .filter((item) => item.status == BookingStatus.tentative)
          )
        );
    }
  }

  acceptBookingHandler(bookingId: number) {
    const status: BookingStatusUpdateRequest = {
      bookingStatus: BookingStatus.confirmed,
    };
    this.bookingService
      .updateBookingStatus(bookingId, status)
      .subscribe(() => this.getBookings());
  }

  rejectBookingHandler(bookingId: number) {
    const status: BookingStatusUpdateRequest = {
      bookingStatus: BookingStatus.declined,
    };
    this.bookingService
      .updateBookingStatus(bookingId, status)
      .subscribe(() => this.getBookings());
  }

}
