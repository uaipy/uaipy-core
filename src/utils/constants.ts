export const CONTENT_TYPE_JSON = 'application/json';


export const defaultHeaders = (contentType: string) => {
    return {
      'Content-Type': contentType || CONTENT_TYPE_JSON,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
  };