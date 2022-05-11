import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from 'src/app/models/api.models';

@Component({
  selector: 'app-cancel-booking-card',
  templateUrl: './cancel-booking-card.component.html',
  styleUrls: ['./cancel-booking-card.component.scss'],
})
export class CancelBookingCardComponent implements OnInit {
  @Input() chosenBooking: Booking | undefined;
  @Input() name: string | undefined;
  @Input() practiceName: string | undefined;
  @Output() onCancellation: EventEmitter<number> = new EventEmitter<number>();

  showCancelButton: boolean | undefined;
  consultationState: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.showButton();
  }

  cancelBooking(bookingId: number) {
    this.onCancellation.emit(bookingId);
  }

  showButton() {
    if (this.chosenBooking && new Date(this.chosenBooking.startTime) > new Date()) {
      this.showCancelButton = true;
      this.consultationState = 'upcoming consultations'
    } else {
      this.showCancelButton = false;
      this.consultationState = 'past consultations'
    }
  }
}
