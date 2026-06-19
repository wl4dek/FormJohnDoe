import { ValueObject } from '../shared/base/ValueObject.js';
import { DomainError } from '../shared/errors/DomainError.js';

const MIN_LENGTH = 3;
const MAX_LENGTH = 255;

interface FullNameProps {
  value: string;
}

export class FullName extends ValueObject<FullNameProps> {
  private constructor(props: FullNameProps) {
    super(props);
  }

  static create(value: string): FullName {
    const trimmed = value.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new DomainError(`Nome deve ter no mínimo ${MIN_LENGTH} caracteres`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new DomainError(`Nome deve ter no máximo ${MAX_LENGTH} caracteres`);
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) {
      throw new DomainError('Nome contém caracteres inválidos');
    }
    return new FullName({ value: trimmed });
  }

  get value(): string {
    return this.props.value;
  }
}
