import { ValueObject } from '../shared/base/ValueObject.js';
import { DomainError } from '../shared/errors/DomainError.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static criar(valor: string): Email {
    const normalizado = valor.toLowerCase().trim();
    if (!EMAIL_REGEX.test(normalizado)) {
      throw new DomainError('E-mail inválido');
    }
    return new Email({ value: normalizado });
  }

  get value(): string {
    return this.props.value;
  }
}
