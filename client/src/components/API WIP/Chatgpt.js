const OpenAI = require('openai');

const API_KEY=process.env.REACT_APP_OPENAI_KEY
const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

const getChatResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return response;
  } catch (error) {
    console.error('Error fetching completion:', error);
    throw error; // Rethrow to handle upstream
  }
};

export default getChatResponse;
