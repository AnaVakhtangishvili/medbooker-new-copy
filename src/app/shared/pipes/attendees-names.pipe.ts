import { Pipe, PipeTransform } from '@angular/core';
import { Attendee, AttendeeType } from 'src/app/models/api.models';

@Pipe({
  name: 'attendeesNames'
})
export class AttendeesNamesPipe implements PipeTransform {

  transform(attendees: Attendee[] | undefined, role: AttendeeType | undefined): string {
    const patient = attendees?.find(elem => elem.attendeeType == role);
    return `${patient?.entity.firstName} ${patient?.entity.lastName}`
  }

}
