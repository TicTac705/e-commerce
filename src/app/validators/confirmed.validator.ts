import {AbstractControl, ValidatorFn} from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(matchingControlName);
    if (checkControl?.errors && !checkControl.errors['confirmedValidator']) {
      return null;
    }
    if (control?.value !== checkControl?.value) {
      controls.get(matchingControlName)?.setErrors({confirmedValidator: {controlName: controlName}});
      return {matching: true};
    } else {
      return null;
    }
  };
}
