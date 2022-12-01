import {Component, OnInit} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {ConfirmedValidator} from "../../validators/confirmed.validator";
import {Register, RegisterFormFields} from "../../dto/auth.interface";
import {Form} from "../../types/form.type";
import {AuthService} from "../../services/api/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  form = this.formBuilder.group<Form<RegisterFormFields>>({
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    },
    {
      validators: ConfirmedValidator('password', 'passwordConfirm'),
      updateOn: 'blur'
    });

  lockedSubmit: boolean = false;

  get disabledSubmit() {
    return this.lockedSubmit;
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signUp() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.lockedSubmit = true;

    const formData: Register = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      password_confirmation: this.form.value.passwordConfirm!
    };

    this.authService.register(formData).subscribe({
        complete: () => {
          this.form.reset();
          this.router.navigate(['sign-in',]).then();
          this.lockedSubmit = false;
        },
        error: () => this.lockedSubmit = false
      }
    );
  }
}
