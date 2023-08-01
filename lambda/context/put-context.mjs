// put-context.mjs

import { MongoClient } from 'mongodb';

const putContext = async (event, context) => {
  const assignmentId = parseInt(event.pathParameters.assignment_id);
  const questionId = parseInt(event.pathParameters.question_id);
  let client;

  // Parse the request body for the new context data
  const newContext = JSON.parse(event.body);

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);

    const database = client.db("srs");

    const contextCollection = database.collection("context");

    // Formulate the query and update details
    const query = { assignmentId: assignmentId, questionId: questionId };
    const update = { $set: newContext };

    // Update the context in the database
    const result = await contextCollection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Context not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Context updated successfully' }),
    };
  } catch (err) {
    console.error('Failed to update context:', err);
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

export default putContext;
