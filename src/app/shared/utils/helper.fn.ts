import { Booking, BookingResponse } from "src/app/models/api.models";

export function flattenBookings(bookings:BookingResponse): Booking[] {
  return Object.values(bookings.bookingMap).flat();
}