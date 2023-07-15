import { AxiosHttpClient } from '@/src/integration/infra/axios-http-client';
import { IHttpClient } from '@/src/integration/infra/http-client';

export const makeHttpClientFactory = (): IHttpClient => {
  return AxiosHttpClient.getInstance();
};
