import {
  BadRequestError,
  ForbiddenError,
  NoContentError,
  NotAllowedError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
} from '@/src/integration/domain/exceptions';
import { ApiResponse } from '@/src/integration/data/models/apiResponse/base/interfaces';
import { HttpStatusCode, IHttpResponse } from '@/src/integration/infra/http-client';

export class ResponseHandler {
  static handle = <T>(response: IHttpResponse<ApiResponse<T> | any>) => {
    if (response.statusCode === HttpStatusCode.ok) {
      return Promise.resolve(response.body.data);
    }

    if (response.statusCode === HttpStatusCode.noContent) {
      return Promise.reject(new NoContentError());
    }

    if (response.statusCode === HttpStatusCode.notFound) {
      return Promise.reject(new NotFoundError(response.body.message));
    }

    if (response.statusCode === HttpStatusCode.unprocessableEntity) {
      return Promise.reject(new UnprocessableEntityError(response.body.message));
    }

    if (response.statusCode === HttpStatusCode.unauthorized) {
      return Promise.reject(new UnauthorizedError(response.body.message));
    }

    if (response.statusCode === HttpStatusCode.forbidden) {
      return Promise.reject(new ForbiddenError(response.body.message));
    }

    if (response.statusCode === HttpStatusCode.badRequest) {
      return Promise.reject(new BadRequestError(response.body.message));
    }

    if (response.statusCode === HttpStatusCode.notAllowed) {
      return Promise.reject(new NotAllowedError(response.body.message));
    }
  };
}
