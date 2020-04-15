import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { Validators } from '@lemoncode/fonk';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
const validationSchema = {
     field: {
       userName: [Validators.required.validator],
       firstName: [Validators.required.validator],
       lastName: [Validators.required.validator],
       email: [Validators.required.validator,Validators.email.validator],
      //  passwordHash: [Validators.required.validator,Validators.minLength.validator],
       
     }
    }

    export const formValidation = createFinalFormValidation(validationSchema);