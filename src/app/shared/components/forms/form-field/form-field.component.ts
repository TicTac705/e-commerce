import {Component, ContentChild} from '@angular/core';
import {NgControl} from "@angular/forms";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
  @ContentChild(NgControl, {static: true}) public ngControl!: NgControl;

  get control() {
    return this.ngControl?.control;
  }

  get showErrors() {
    if (!this.control) {
      return false;
    }
    return (this.control.dirty || this.control.touched) && this.control.invalid;
  }
}
