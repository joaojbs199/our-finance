export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message ?? 'BadRequest');
    this.name = 'BadRequestError';
  }
}
