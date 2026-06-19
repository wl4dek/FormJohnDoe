export class DomainError extends Error {
  readonly field: string;

  constructor(message: string, field: string = 'general') {
    super(message);
    this.name = 'DomainError';
    this.field = field
  }
}
