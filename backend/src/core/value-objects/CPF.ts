import { ValueObject } from '../shared/base/ValueObject.js';
import { DomainError } from '../shared/errors/DomainError.js';
import { CPFValidator } from '../services/CPFValidator.js';

interface CPFProps {
  value: string;
}

export class CPF extends ValueObject<CPFProps> {
  private constructor(props: CPFProps) {
    super(props);
  }

  static criar(valor: string): CPF {
    const apenasDigitos = valor.replace(/\D/g, '');
    if (!CPFValidator.validar(apenasDigitos)) {
      throw new DomainError('CPF inválido');
    }
    return new CPF({ value: apenasDigitos });
  }

  get value(): string {
    return this.props.value;
  }

  get formatado(): string {
    const d = this.props.value;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
  }
}
