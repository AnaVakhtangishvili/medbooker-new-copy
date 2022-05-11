import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/app/models/api.models';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  @Input() doctor: Doctor | undefined;
  @Output() toNavigateToBooking: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  navigateToBooking(doctorsEntity: number) {
    this.toNavigateToBooking.emit(doctorsEntity);
  }
}
