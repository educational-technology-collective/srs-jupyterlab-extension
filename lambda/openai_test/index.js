const { Configuration, OpenAIApi } = require("openai")
const { stringify } = require("flatted");


const configuration = new Configuration({
  organization: "your_organization_id", // Replace with your OpenAI organization ID
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


exports.handler = async (event) => {
  try {
    const response = await openai.listEngines();
    const jsonString = stringify(response);
    console.log(jsonString);
    return {
      statusCode: 200,
      body: jsonString,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "An error occurred while fetching data from OpenAI API.",
    };
  }
};
