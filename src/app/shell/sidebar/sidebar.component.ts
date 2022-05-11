import { Component, OnInit } from '@angular/core';
import { NbIconLibraries, NbSidebarService } from '@nebular/theme';
import { RolesEntityNo, SidebarButtons, UserData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  user: UserData = this.authService.currentUser;
  role = RolesEntityNo;
  sidebarButtonsNames = SidebarButtons;
  menuCollapsed = false;

  constructor(
    private sidebarService: NbSidebarService,
    private iconLibraries: NbIconLibraries,
    private authService: AuthService
  ) {
    this.iconLibraries.registerFontPack('fas', {
      packClass: 'fas',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.registerFontPack('far', {
      packClass: 'far',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.registerFontPack('fab', {
      packClass: 'fab',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.setDefaultPack('far');
  }

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(true);
    this.menuCollapsed = !this.menuCollapsed;
    return false;
  }
}
