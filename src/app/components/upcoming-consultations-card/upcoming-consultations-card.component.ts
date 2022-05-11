import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from 'src/app/models/api.models';

@Component({
  selector: 'app-upcoming-consultations-card',
  templateUrl: './upcoming-consultations-card.component.html',
  styleUrls: ['./upcoming-consultations-card.component.scss']
})
export class UpcomingConsultationsCardComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Input() chosenBooking: Booking | undefined;
  @Output() onCardClick: EventEmitter<number> = new EventEmitter<number>();

  @Input() name: string | undefined;
  @Input() practiceName: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  clickOnCard(bookingId: number) {
    this.onCardClick.emit(bookingId);
  }

}
