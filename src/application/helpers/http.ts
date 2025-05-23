/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultHeaders } from './headers';
import { statusCodeMap } from 'src/main/adapters/function';

export type Response<T = any> = {
  statusCode: number;
  body: T;
  headers?:
        | {
            [header: string]: boolean | number | string;
        }
        | undefined;
    multiValueHeaders?:
        | {
            [header: string]: Array<boolean | number | string>;
        }
        | undefined;
    isBase64Encoded?: boolean | undefined;
};




export const ok = <T = any>(result: T): Response<T> => {
  const response = {
    headers: defaultHeaders(''),
    statusCode: statusCodeMap.ok,
    body: result,
  };
  return response;
};

export const created = <T = any>(result: T): Response<T> => {
  const response = {
    headers: defaultHeaders(''),
    statusCode: statusCodeMap.created,
    body: result,
  };
  return response;
};

export const badRequest = (error: Error): Response<Error> => ({
  statusCode: statusCodeMap.badRequest,
  body: error,
  headers: defaultHeaders(''),
});

export const notFound = (error: any): Response<Error> => ({
  statusCode: statusCodeMap.notFound,
  body: error,
  headers: {},
});

export const serverError = (error: any): Response<Error> => ({
  statusCode: statusCodeMap.internalServerError,
  body: error,
  headers: {},
});

export const unauthorized = (error: any): Response<Error> => ({
  statusCode: statusCodeMap.unauthorized,
  body: error,
  headers: {},
});

