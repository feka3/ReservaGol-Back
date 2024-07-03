import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordConfirmation', async: false })
export class PasswordConfirmation implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `La contraseña y su confirmación no coinciden`;
  }
}
