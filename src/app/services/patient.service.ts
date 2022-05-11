import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/api.models';
import { BASE_URL } from '../shared/utils/tokens.fn';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientUrl = `${this.baseUrl}/member`

  constructor(private httpClient: HttpClient, @Inject(BASE_URL)private baseUrl: string) { }
    
  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.patientUrl}/`);
  }

  getPatient(entityNo: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.patientUrl}/${entityNo}`);
  }

  searchPatient(firstName?: string, lastName?: string): Observable<Patient[]> {
    let httpParams = new HttpParams();

    if (firstName) httpParams = httpParams.set('firstName', firstName);
    if (lastName) httpParams = httpParams.set('lastName', lastName);

    return this.httpClient.get<Patient[]>(`${this.patientUrl}/search`, {params: httpParams});
  }
}
