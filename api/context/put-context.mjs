import { MongoDbHelper } from './mongodb-helper.mjs';

exports.handler = async (event, dbHelper) => {
  const assignmentId = event.pathParameters.assignmentId;
  const questionId = event.pathParameters.questionId;
  const body = JSON.parse(event.body);

  const db = MongoDbHelper.getDb('YourDbName');
  const contextCollection = db.collection('context');

  const result = await contextCollection.updateOne(
    { assignmentId: assignmentId, questionId: questionId },
    { $set: body },
    { upsert: true }  // This will insert a new document if no match is found
  );

  if (!result || result.modifiedCount === 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update context' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Context updated successfully' }),
  };
};
