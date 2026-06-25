export class UserAlreadyExistsError extends Error {
  readonly field: string;

  constructor(message: string, field: string = 'general') {
    super(message);
    this.name = 'UserAlreadyExistsError';
    this.field = field
  }
}
