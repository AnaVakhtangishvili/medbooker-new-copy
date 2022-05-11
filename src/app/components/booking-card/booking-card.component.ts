import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttendeeType, Booking } from 'src/app/models/api.models';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {

  attendee = AttendeeType;
  @Input() booking: Booking | undefined;

  @Output() onAcceptBooking: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRejectBooking: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  acceptBooking(bookingId: number) {
    this.onAcceptBooking.emit(bookingId);
  }

  rejectBooking(bookingId: number) {
    this.onRejectBooking.emit(bookingId);
  }
}
