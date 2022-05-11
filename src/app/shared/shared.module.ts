import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from './nebular/nebular.module';
import { FormErrorMessagesDirective } from './directives/form-error-messages.directive';
import { AttendeesNamesPipe } from './pipes/attendees-names.pipe';



@NgModule({
  declarations: [
    FormErrorMessagesDirective,
    AttendeesNamesPipe
  ],
  imports: [
    CommonModule,
    NebularModule
  ],
  exports: [NebularModule, FormErrorMessagesDirective, AttendeesNamesPipe]
})
export class SharedModule { }
