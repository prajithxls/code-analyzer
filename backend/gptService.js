const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeCodeWithGPT(code, language) {
  const prompt = `
You are a helpful assistant. Analyze the following ${language} code and return the time and space complexity. Add inline comments where appropriate.

Code:
${code}

Return only the commented code with explanations.
`;

const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', 
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

module.exports = analyzeCodeWithGPT;
