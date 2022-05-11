import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { NbSidebarService } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, MainComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [MainComponent],
  providers: [NbSidebarService]
})
export class ShellModule {}
