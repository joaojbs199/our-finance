export class NotAllowedError extends Error {
  constructor(message?: string) {
    super(message ?? 'NotAllowed');
    this.name = 'NotAllowedError';
  }
}
