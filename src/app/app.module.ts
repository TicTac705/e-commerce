import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterOutlet} from "@angular/router";
import {HttpBackend, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {JwtModule} from "@auth0/angular-jwt";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {NgxLoadingModule} from "ngx-loading";
import {MainLayoutModule} from "./components/main-layout/main-layout.module";
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {MissingTranslationService} from "./services/missing-translation.service";
import {TOKEN_KEY} from "./services/api/auth.service";
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {FormInputComponent} from './shared/components/forms/form-input/form-input.component';
import {FormFieldComponent} from './shared/components/forms/form-field/form-field.component';

import config from '../assets/config/config.json';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function HttpLoaderFactory(http: HttpBackend): TranslateLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/basket/', suffix: '.json'},
    {prefix: './assets/i18n/catalog/', suffix: '.json'},
    {prefix: './assets/i18n/form/', suffix: '.json'},
    {prefix: './assets/i18n/layout/', suffix: '.json'},
    {prefix: './assets/i18n/order/', suffix: '.json'}
  ]);
}

// TODO some components need to be moved to the appropriate modules
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    SignInComponent,
    SignUpComponent,
    FormInputComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainLayoutModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: getToken,
          authScheme: 'Bearer ',
          throwNoTokenError: true,
          allowedDomains: config.allowedDomains,
          disallowedRoutes: config.disallowedRoutes
        }
      }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService}
    }),
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
