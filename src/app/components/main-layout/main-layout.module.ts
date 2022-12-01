import {NgModule} from '@angular/core';
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {BrowserModule} from '@angular/platform-browser';

import {MainLayoutComponent} from "./main-layout.component";
import { GeneralHeaderCommonComponent } from './components/general-header-common/general-header-common.component';
import { GeneralHeaderPersonalComponent } from './components/general-header-personal/general-header-personal.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    RouterLinkWithHref,
    BrowserModule,
    RouterOutlet,
    RouterLinkActive,
    TranslateModule
  ],
  declarations: [
    MainLayoutComponent,
    GeneralHeaderCommonComponent,
    GeneralHeaderPersonalComponent
  ],
  exports: []
})
export class MainLayoutModule {
}
