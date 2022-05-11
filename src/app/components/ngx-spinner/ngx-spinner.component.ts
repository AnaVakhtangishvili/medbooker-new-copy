import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ngx-spinner',
  templateUrl: './ngx-spinner.component.html',
  styleUrls: ['./ngx-spinner.component.scss']
})
export class NgxSpinnerComponent implements OnInit {

    constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
  }

}
