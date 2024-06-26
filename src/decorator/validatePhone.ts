import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isArgentinePhoneNumber', async: false })
export class IsArgentinePhoneNumber implements ValidatorConstraintInterface {

  validate(phone: any, args: ValidationArguments) {
    if (typeof phone !== 'string') {
      return false;
    }

    // Eliminar caracteres no numéricos y el signo más (+) si está presente
    const cleanedPhone = phone.replace(/[^\d]/g, '');

    // Validar el formato de número de teléfono móvil argentino
    return /^(\+?54)?9?(11|2\d|3\d|9\d)\d{8}$/.test(cleanedPhone);
  }

  defaultMessage(args: ValidationArguments) {
    return 'El número de teléfono no es válido para Argentina.';
  }
}
