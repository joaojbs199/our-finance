export class UnprocessableEntityError extends Error {
  constructor(message?: string) {
    super(message ?? 'UnprocessableEntity');
    this.name = 'UnprocessableEntityError';
  }
}
