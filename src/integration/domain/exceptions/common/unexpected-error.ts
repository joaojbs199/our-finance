export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unexpected');
    this.name = 'UnexpectedError';
  }
}
