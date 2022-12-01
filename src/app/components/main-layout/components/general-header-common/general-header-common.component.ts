import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/api/auth.service";

import config from '../../../../../assets/config/config.json';

export interface HeaderMenuItem {
  i18n: string;
  link: string;
  exact: boolean;
  hide?: boolean;
}

@Component({
  selector: 'app-general-header-common',
  templateUrl: './general-header-common.component.html',
  styleUrls: ['./general-header-common.component.scss']
})

export class GeneralHeaderCommonComponent implements OnInit {

  companyName: string = config.companyName;
  menuItems: HeaderMenuItem[] = [
    {
      i18n: 'Header.Menu.Home',
      link: '',
      exact: true
    },
    {
      i18n: 'Header.Menu.Catalog',
      link: '/catalog',
      exact: true
    },
    {
      i18n: 'Header.Menu.Orders',
      link: '/orders',
      exact: true,
      hide: !this.authService.isAuth()
    }
  ];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }
}
