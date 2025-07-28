const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyCfFSc3rqBE4kofBdRTR_XjVxSmk5pnuSs";

app.post('/analyze', async (req, res) => {
  const { code, language } = req.body;

  const prompt = `Analyze the time and space complexity of the following ${language} code and just give the time and space complexity in one line and also with the data structure used in new line:\n\n${code}`;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    console.log('🔍 Gemini raw response:', JSON.stringify(geminiRes.data, null, 2));

    const comment =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ Gemini returned no analysis.';

    res.json({ comment });

  } catch (error) {
    console.error('❌ Gemini error:', error.response?.data || error.message);
    res.status(500).json({ comment: '❌ Error analyzing code.' });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
