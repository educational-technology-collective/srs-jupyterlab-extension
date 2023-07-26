// index.js

import MongoDbHelper from './mongodb-helper.mjs';
import getContext from './get-context.mjs';
import putContext from './put-context.mjs';

const dbHelper = new MongoDbHelper(process.env.MONGODB_URI);

exports.handler = async (event, context) => {
  // Connect to MongoDB
  await dbHelper.connect();

  if (event.httpMethod === 'GET' && event.path === '/context/{assignmentId}/{questionId}') {
    return getContext.handler(event, context, dbHelper);
  } else if (event.httpMethod === 'PUT' && event.path === '/context/{assignmentId}/{questionId}') {
    return putContext.handler(event, context, dbHelper);
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Route not found' }),
    };
  }
};
