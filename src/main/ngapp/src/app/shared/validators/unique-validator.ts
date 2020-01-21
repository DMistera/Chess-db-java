import { AbstractControl, ValidatorFn } from '@angular/forms';

export function uniqueValidator(pool: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = pool.find(v => {
      return v === control.value;
    }) === undefined;
    return valid ? null : {unique: {value: control.value}};
  };
}
