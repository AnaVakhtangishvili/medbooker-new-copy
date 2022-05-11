import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/models/api.models';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient | undefined;
  @Output() onAppointmentButtonClick: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  appointmentButtonClick(patientsEntityNo: number) {
    this.onAppointmentButtonClick.emit(patientsEntityNo);
  }

}
