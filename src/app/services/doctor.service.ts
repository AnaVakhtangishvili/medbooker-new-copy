import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/api.models';
import { BASE_URL } from '../shared/utils/tokens.fn';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorUrl = `${this.baseUrl}/practitioner`

  constructor(private httpClient: HttpClient, @Inject(BASE_URL)private baseUrl: string) { }

  getDoctors(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`${this.doctorUrl}/`);
  }

  getDoctor(entityNo: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.doctorUrl}/${entityNo}`);
  }

  searchDoctor(firstName?: string, lastName?: string): Observable<Doctor[]> {
    let httpParams = new HttpParams();

    if (firstName) httpParams = httpParams.set('firstName', firstName);
    if (lastName) httpParams = httpParams.set('lastName', lastName);

    return this.httpClient.get<Doctor[]>(`${this.doctorUrl}/search`, {params: httpParams});
  }

}
