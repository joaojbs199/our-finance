export class NoContentError extends Error {
  constructor(message?: string) {
    super(message ?? 'NoContent');
    this.name = 'NoContentError';
  }
}
