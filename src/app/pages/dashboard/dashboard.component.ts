import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable } from 'rxjs';
import {
  Booking,
  BookingStatus,
  BookingStatusUpdateRequest,
} from 'src/app/models/api.models';
import { RolesEntityNo } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { flattenBookings } from 'src/app/shared/utils/helper.fn';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userRole: RolesEntityNo | undefined;
  role = RolesEntityNo;
  bookings$: Observable<Booking[]> | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
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
              .filter((_, index) => index < 5)
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
