export type HttpResponse = {
  statusCode: number;
  body: string;
  headers: {
    [header: string]: boolean | number | string;
  };
  multiValueHeaders?:
    | {
        [header: string]: Array<boolean | number | string>;
      }
    | undefined;
  isBase64Encoded?: boolean | undefined;
};
