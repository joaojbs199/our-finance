import axios from 'axios';
import { IHttpClient, IHttpRequest, IHttpResponse } from './http-client';

export class AxiosHttpClient implements IHttpClient {
  private static instance: AxiosHttpClient;
  async request(data: IHttpRequest): Promise<IHttpResponse> {
    return axios
      .request({
        baseURL: 'http://localhost:3000',
        url: data.url,
        method: data.method,
        data: data.body,
      })
      .then((res) => {
        return {
          statusCode: res.status,
          body: res.data,
        };
      })
      .catch((err) => {
        return {
          statusCode: err?.response?.status,
          body: err?.response?.data,
        };
      });
  }

  public static getInstance(): AxiosHttpClient {
    if (!AxiosHttpClient.instance) {
      AxiosHttpClient.instance = new AxiosHttpClient();
    }

    return AxiosHttpClient.instance;
  }
}
