import { Component, OnInit } from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {Authorize} from "../../dto/auth.interface";
import {AuthService} from "../../services/api/auth.service";
import {Router} from "@angular/router";
import {Form} from "../../types/form.type";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form = this.formBuilder.group<Form<Authorize>>({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
    },
    {updateOn: 'blur'}
  );

  lockedSubmit = false;
  get disabledSubmit() {
    return this.lockedSubmit;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signIn() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.lockedSubmit = true;

    const credentials: Authorize = this.form.getRawValue();

    this.authService.login(credentials).subscribe({
        complete: () => {
          this.form.reset();
          this.router.navigate(['/']).then();
          this.lockedSubmit = false;
        },
        error: () => this.lockedSubmit = false
      }
    );
  }
}
