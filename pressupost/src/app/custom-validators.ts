import {
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

/**
 * * primero creamos la clase 'CustomValidators' que se estiende de la clase 'Validators' que nos ofrece Angular por defecto, de esta forma vamos a tener sus propiedades y sus métodos.
 * * creamos validación estática onlyNumbers que recibe como parámetro el 'control' y va a retornar el 'error' comparando antes si se cumple el regex (solo números)
 */

// Regex validación formularios
const validateExpressions = {
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/,
  lastname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/,
  phone: /^\d{9}$/,
};

/**
 * * Validaciones para only numbers
 * este código nos dice: que el valor del control que se esta escribiendo cumple con la regex
 *  si se cumple, no vamos a enviar nada, si no se cumple enviaremos el objeto onlyNumbers
 *  */
export class CustomValidators extends Validators {
  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
  }

  /**
   * * Validaciones para Name y Lastname
   * este código nos dice: que el valor del control que se esta escribiendo cumple con la regex
   *  si se cumple, no vamos a enviar nada, si no se cumple enviaremos el objeto onlyNumbers
   *  */

  static onlyLetters(control: AbstractControl): ValidationErrors | null {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/.test(control.value)
      ? null
      : { onlyLetters: true };
  }

  /**
   * * Validaciones para campo de Passwords y confirmar password
   * En mustBeEqual, recibimos como parámetros los nombre de los 2 controles (definidos en create.account.components.ts => 'password' & 'passwordConfirmation').
   *  si se cumple, no vamos a enviar nada, si no se cumple enviaremos el objeto onlyNumbers
   *  */
  static mustBeEqual(
    nameFirstControl: string,
    nameSecondControl: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstControl = group.get(nameFirstControl);
      const secondControl = group.get(nameSecondControl);
      return firstControl?.value === secondControl?.value
        ? null
        : { mustBeEqual: true };
    };
  }

  static atLeastOneNumber(control: AbstractControl): ValidationErrors | null {
    return /\d+/.test(control.value) ? null : { toNumber: true };
  }

  static atLeastOneUppercase(
    control: AbstractControl
  ): ValidationErrors | null {
    return /[A-Z]+/.test(control.value) ? null : { atLeastOneUppercase: true };
  }

  static atLeastOneLowercase(
    control: AbstractControl
  ): ValidationErrors | null {
    return /[a-z]+/.test(control.value) ? null : { atLeastOneLowercase: true };
  }

  static mustBeDifferent(firstField: string, secondField: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstControl = group.get(firstField);
      const secondControl = group.get(secondField);
      return firstControl?.value != secondControl?.value
        ? null
        : { mustBeDifferent: true };
    };
  }
  /**
   * * Validaciones para Phone
   * este código nos dice: que el valor del control que se esta escribiendo cumple con la regex
   *  si se cumple, no vamos a enviar nada, si no se cumple enviaremos el objeto onlyNumbers
   *  */

  static onlyPhones(control: AbstractControl): ValidationErrors | null {
    return validateExpressions.phone.test(control.value)
      ? null
      : { onlyPhones: true };
  }
}
