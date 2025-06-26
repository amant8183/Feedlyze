const express = require('express');
const router = express.Router();
const Feedback = require('../models/db');
const axios = require('axios');

const GROQ_API_KEY = "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";

router.post('/', async (req, res) => {
  const { input } = req.body;

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that gives feedback on user responses.',
          },
          {
            role: 'user',
            content: input,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const feedback = groqResponse.data.choices[0].message.content;

    const newFeedback = new Feedback({ user_input: input, feedback });
    await newFeedback.save();

    res.json({ feedback });
  } catch (error) {
    console.error('Error generating feedback:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error generating feedback.' });
  }
});



router.get('/history', async (req, res) => {
  try {
    const history = await Feedback.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching feedback history:', error.message);
    res.status(500).json({ error: 'Error fetching feedback history.' });
  }
});



module.exports = router;