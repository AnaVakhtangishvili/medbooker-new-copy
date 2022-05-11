import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingRequest, BookingResponse, BookingStatusUpdateRequest } from '../models/api.models';
import { BASE_URL } from '../shared/utils/tokens.fn';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingUrl = `${this.baseUrl}/booking`

  constructor(private httpClient: HttpClient, @Inject(BASE_URL)private baseUrl: string) { }

  createBooking(body: BookingRequest): Observable<Booking> {
    return this.httpClient.post<Booking>(`${this.bookingUrl}/`, body);
  }

  getBookingsForEntity(entityNo: number, fromDate?: string, toDate?: string): Observable<BookingResponse> {
    let httpParams = new HttpParams();

    if(fromDate) httpParams = httpParams.set('fromDate', fromDate);
    if(toDate) httpParams = httpParams.set('toDate', toDate);

    return this.httpClient.get<BookingResponse>(`${this.bookingUrl}/attendee/${entityNo}`, {params: httpParams});
  }

  getBooking(boookingId: number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.bookingUrl}/${boookingId}`);
  }

  updateBookingStatus(
    bookingId: number,
    body: BookingStatusUpdateRequest
  ): Observable<Booking> {
    return this.httpClient.put<Booking>(`${this.bookingUrl}/${bookingId}/status`, body);
  }
}
