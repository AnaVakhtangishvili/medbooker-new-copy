import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable, tap } from 'rxjs';
import { Doctor } from 'src/app/models/api.models';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  doctorsForm: FormGroup | undefined;
  length: number = 0;

  constructor(private formBuilder: FormBuilder, private doctorService: DoctorService, private router: Router) { }

  doctors$: Observable<Doctor[]> | undefined;

  ngOnInit() {
    this.createDoctorsForm();
    this.getAllDoctors();
    this.searchDoctors();
  }

  createDoctorsForm() {
    this.doctorsForm = this.formBuilder.group({
      doctorsName: [''],
      doctorsLastname: ['']
    })
  }

  getAllDoctors() {
    this.doctors$ = this.doctorService.getDoctors().pipe(tap(doctors => this.length = doctors.length));
  }

  searchDoctors() {
      this.doctorsForm?.valueChanges.pipe(debounceTime(1000)).subscribe(({doctorsName, doctorsLastname}) => {
        this.doctors$ = this.doctorService.searchDoctor(doctorsName, doctorsLastname).pipe(tap((doctors) => this.length = doctors.length));
        if (!(doctorsName || doctorsLastname)) {
          this.getAllDoctors();
        }
    })
  }

  navigationHandler(doctorsEntity: number) {
    this.router.navigate(['main/booking/', doctorsEntity])
  }

}
