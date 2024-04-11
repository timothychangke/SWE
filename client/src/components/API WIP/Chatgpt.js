
const OpenAI = require('openai'); // Import the OpenAI library

const API_KEY = process.env.REACT_APP_OPENAI_KEY; // Retrieve the API key from environment variables
const openai = new OpenAI({ // Initialize OpenAI with the API key
  apiKey: API_KEY, 
  dangerouslyAllowBrowser: true, 
});

const getChatResponse = async (prompt) => { // Define an asynchronous function to get chat response
  try {
    const response = await openai.chat.completions.create({ // Make an API call to OpenAI to get chat completions
      model: 'gpt-4', // Specify the model to be used, in this case is GPT-4 to allow Webscraping feature
      messages: [{ role: 'user', content: prompt }], // Define the prompt message with user role
    });
    return response; // Return the response received from OpenAI
  } catch (error) {
    console.error('Error fetching completion:', error); // Log error to the console if the API call fails
    throw error; 
  }
};

export default getChatResponse; 
