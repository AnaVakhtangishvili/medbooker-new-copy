import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() onSubmit: EventEmitter<Date> = new EventEmitter<Date>();
  datePickerForm: FormGroup | undefined;
  get today() {
    const date = new Date;
    date.setDate(date.getDate() - 1);
    return date;
  }
  get filter() {
    const filter = (date: { getDay: () => number; }) => date.getDay() !== 0;
    return filter;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createDatePickerForm();
  }

  createDatePickerForm() {
    this.datePickerForm = this.formBuilder.group({
      date: ['', Validators.required]
    })
  }

  submit() {
    this.onSubmit.emit(this.datePickerForm?.value.date);
    this.datePickerForm?.reset();
  }
}
