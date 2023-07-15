import { RequestHandler } from '@/src/integration/data/services/base/request-handler';

export const makeRequestHandlerFactory = () => {
  return RequestHandler.getInstance();
};
