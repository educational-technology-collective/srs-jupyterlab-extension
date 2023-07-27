// index.mjs

import getContext from './get-context.mjs';
import putContext from './put-context.mjs';
import pushContext from './push-context.mjs';

export const handler = async (event, context) => {

  const path = event.requestContext.http.path;
  const method = event.requestContext.http.method;

  if (path.startsWith('/dev/dev/context/')) {
    if (method === 'GET') {
      return getContext(event);
    } else if (method === 'PUT') {
      return putContext(event, context);
    } else if (method === 'POST') {
      return pushContext(event, context);
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Route not found' }),
      };
    }
  } else {
    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Route not found' }),
      };
  }
};
