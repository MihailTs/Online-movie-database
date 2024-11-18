import { config } from '../config';
import { userInfoService } from './userInfo';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  query?: Record<string, any>;
  body?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

type GetRequestOptions = Omit<RequestOptions, 'body'>;

export class HttpError extends Error {}
export class AuthorizationError extends HttpError {}
export class ValidationError extends Error {
  constructor(
    public fieldErrors: Record<string, string[]>,
    public formErrors: []
  ) {
    super();
  }
}
export class BadRequestError extends Error {}
export class NotFoundError extends HttpError {}
export class ServerError extends HttpError {}
class HttpService {
  get<T>(path: string, options: GetRequestOptions) {
    return this.request<T>(path, 'GET', options);
  }

  post<T>(path: string, options: RequestOptions) {
    return this.request<T>(path, 'POST', options);
  }

  put<T>(path: string, options: RequestOptions) {
    return this.request<T>(path, 'PUT', options);
  }

  delete<T>(path: string, options: RequestOptions) {
    return this.request<T>(path, 'DELETE', options);
  }

  private async request<T>(
    path: string,
    method: Method,
    { body, headers, query }: RequestOptions
  ) {

    const baseUrl = config.baseUrl.replace(/\/$/, '');
    const requestPath = path.replace(/^\//, '');
    const queryString = new URLSearchParams(query).toString();

    const url = `${baseUrl}/${requestPath}?${queryString}`;

    const token = userInfoService.authToken;

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: {
          ...(token ? { Authorization: token } : {}),
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } catch (err) {
      console.error(err);
      throw new HttpError();
    }

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        if ('fieldErrors' in data && 'formErrors' in data) {
          throw new ValidationError(data.fieldErrors, data.formErrors);
        }
        throw new BadRequestError();
      }
  
      if (response.status === 401) {
        throw new AuthorizationError;
      }
  
      if (response.status === 404) {
        throw new NotFoundError();
      }
      throw new ServerError();
    }

    const result = (await response.json()) as T;
    return { result, headers: response.headers };
  }
}

export const http = new HttpService();
