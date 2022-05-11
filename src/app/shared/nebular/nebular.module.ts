import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbTimepickerModule,
  NbUserModule,

} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const nebularComponents = [
  NbThemeModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbDatepickerModule.forRoot(),
  NbTimepickerModule.forRoot(),
  NbLayoutModule,
  NbEvaIconsModule,
  NbButtonModule,
  NbIconModule,
  NbFormFieldModule,
  NbInputModule,
  NbSelectModule,
  NbCardModule,
  NbUserModule,
  NbDatepickerModule
];

@NgModule({
  declarations: [],
  imports: [nebularComponents],
  exports: [nebularComponents],
})
export class NebularModule {}
