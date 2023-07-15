import { IHttpClient, IHttpRequest, IHttpResponse } from '@/src/integration/infra/http-client';
import { ResponseHandler } from './response-handler';
import { makeHttpClientFactory } from '@/src/integration/domain/factories/http/http-client-factory';

export class RequestHandler {
  private static instance: RequestHandler;
  private constructor(private readonly httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async handle<T>(requestOptions: IHttpRequest): Promise<T> {
    const { url, method, body } = requestOptions;
    const response: IHttpResponse<T> = await this.httpClient.request({
      url,
      method,
      body,
    });

    return ResponseHandler.handle(response);
  }

  public static getInstance(): RequestHandler {
    if (!RequestHandler.instance) {
      const httpClient = makeHttpClientFactory();
      RequestHandler.instance = new RequestHandler(httpClient);
    }

    return RequestHandler.instance;
  }
}
