import { RolesEntityNo, UserData } from './user.models';

export interface BookingRequest {
  attendees: Attendee[];
  id?: number;
  description?: string;
  title?: string;
  organiser: RolesEntityNo;
  startDate: string;
  endDate: string;
}

export type Booking = Omit<BookingRequest, 'organiser'|'startDate'|'endDate' | 'id'> & {
  status: BookingStatus;
  statusComment: string;
  startTime: string;
  endTime: string;
  id: number
};

export type UpcomingBooking = Booking & {practiceName?: string};

export interface BookingResponse {
  bookingMap: Record<string, Booking[]>;
  endDate: string;
  startDate: string;
}

export interface BookingStatusUpdateRequest  {
  bookingStatus: BookingStatus;
  comment?: string;
  includeDependent?: boolean;
}

export interface Attendee {
  attendeeType: AttendeeType;
  entity: UserData;
  entityNo: RolesEntityNo;
}

export interface Patient {
  entityNo: RolesEntityNo;
  firstName: string;
  lastName: string;
}

export interface Doctor extends Patient {
  practiceName: string;
  practiceNo: string;
}

export enum AttendeeType {
  patient = 'PATIENT',
  provider = 'PROVIDER',
}

export enum BookingStatus {
  confirmed = 'CONFIRMED',
  tentative = 'TENTATIVE',
  declined = 'DECLINED',
  cancelled = 'CANCELLED',
}
