import { ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';
import { CPFValidator } from '@core/services';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return CPFValidator.validar(value);
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}
