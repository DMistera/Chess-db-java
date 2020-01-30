import { AbstractControl, ValidatorFn } from '@angular/forms';

export function existsValidator(pool: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = pool.find(v => {
      return v === control.value;
    }) !== undefined;
    return valid ? null : {exists: {value: control.value}};
  };
}
