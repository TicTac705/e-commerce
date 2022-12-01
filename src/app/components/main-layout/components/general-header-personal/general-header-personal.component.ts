import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/api/auth.service";

@Component({
  selector: 'app-general-header-personal',
  templateUrl: './general-header-personal.component.html',
  styleUrls: ['./general-header-personal.component.scss'],
  host: {
    class: 'general-header__personal personal'
  }
})
export class GeneralHeaderPersonalComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['sign-in']).then();
  }
}
