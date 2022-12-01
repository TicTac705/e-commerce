import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {AuthGuard} from "./guards/auth.guard";
import {GuestGuard} from "./guards/guest.guard";
import {GlobalHttpInterceptor} from "./interceptors/global-http.interceptor";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [GuestGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [GuestGuard]
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    GuestGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    }
  ],
})
export class AppRoutingModule {
}
