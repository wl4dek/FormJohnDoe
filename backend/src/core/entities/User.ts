import { Entity } from '../shared/base/Entity.js';
import { CPF, Email, FullName, Color } from '../value-objects/index.js';

export interface UserProps {
  fullName: FullName;
  cpf: CPF;
  email: Email;
  color: Color;
  observation: string | null;
  createdAt: Date;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(
    props: Omit<UserProps, 'createdAt'> & { createdAt?: Date },
    id?: string,
  ): User {
    return new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
  }

  get fullName(): FullName {
    return this.props.fullName;
  }

  get cpf(): CPF {
    return this.props.cpf;
  }

  get email(): Email {
    return this.props.email;
  }

  get color(): Color {
    return this.props.color;
  }

  get observation(): string | null {
    return this.props.observation;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
