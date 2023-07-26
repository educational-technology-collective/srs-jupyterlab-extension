import { MongoDbHelper } from './mongodb-helper.mjs';

exports.handler = async (event, dbHelper) => {
  const assignmentId = event.pathParameters.assignmentId;
  const questionId = event.pathParameters.questionId;

  const db = MongoDbHelper.getDb('YourDbName');
  const contextCollection = db.collection('context');

  const context = await contextCollection.findOne({ assignmentId: assignmentId, questionId: questionId });

  if (!context) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Context not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(context),
  };
};
