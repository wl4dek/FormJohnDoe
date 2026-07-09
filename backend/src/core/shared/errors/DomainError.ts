export class DomainError extends Error {
  readonly field: string;

  constructor(message: string, field: string = 'general', options?: ErrorOptions) {
    super(message, options);
    this.name = 'DomainError';
    this.field = field;
  }
}
