// push-context.mjs

import { MongoClient } from 'mongodb';

const pushContext = async (event, context) => {
  const assignmentId = parseInt(event.pathParameters.assignment_id);
  const questionId = parseInt(event.pathParameters.question_id);
  let client;

  // Parse the request body for the new context data
  const newContext = JSON.parse(event.body);
  newContext.assignmentId = assignmentId;
  newContext.questionId = questionId;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);

    const database = client.db("srs");

    const contextCollection = database.collection("context");

    // Add the new context to the database
    await contextCollection.insertOne(newContext);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Context added successfully' }),
    };
  } catch (err) {
    console.error('Failed to add context:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default pushContext;
