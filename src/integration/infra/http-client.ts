export interface IHttpClient<R = any> {
  request: (data: IHttpRequest) => Promise<IHttpResponse<R>>;
}

export type IHttpRequest = {
  url: string;
  method: IHttpMethod;
  body?: any;
  headers?: any;
};

export type IHttpResponse<T = any> = {
  statusCode: number;
  body: T;
};

export type IHttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  notAllowed = 405,
  unexpected = 500,
}
