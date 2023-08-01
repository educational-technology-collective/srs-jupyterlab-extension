// get-context.mjs

import { MongoClient } from 'mongodb';

const getContext = async (event) => {
  const assignmentId = parseInt(event.pathParameters.assignment_id);
  const questionId = parseInt(event.pathParameters.question_id);

  console.log("assignmentId", assignmentId);
  console.log("questionId", questionId);

  let client;

  try {
    console.log("url", process.env.MONGODB_URI);

    client = await MongoClient.connect(process.env.MONGODB_URI);

    const database = client.db("srs");

    const contextCollection = database.collection("context");

    const query = { assignmentId: assignmentId, questionId: questionId };

    const context = await contextCollection.findOne(query);

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
  } catch (err) {
    console.error('Failed to fetch context:', err);
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

export default getContext;
