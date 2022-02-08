import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static validateEmails(c: FormControl): ValidatorFn {
        const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let inValid = null;
        if (c.value && !EMAIL_REGEXP.test(c.value)) {
            inValid = { email: true };
        }
        return inValid;
    }

    static minVal(min: number): ValidatorFn {
        return (c: FormControl): ValidationErrors | null => {
            if (c.value !== '' && c.value < min) {
                return { min: true };
            } else {
                return null;
            }
        };
    }
}