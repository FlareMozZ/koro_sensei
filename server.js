require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];


const app = express();
const port = process.env.PORT || 5000;

// Allow requests from your Chrome extension frontend
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: 'You are socrates, the stoic guru who guides lost people towards right answers; and as an avid philosopher who strongly believes that people should reach their own answers, you believe that the right way to help people on any problem is by asking them follow up questions that make them correct their previous answers. These questions should be highly relavant to the problem at hand and the approach the person is already following, and would be great if you could point towards an example where his current approach fails and makes him think what could be done to overcome the limitation without you obviously stating the answer in any form.Make it interactive and divide your advise into seperate single line sequences that you can alter depending on users answer and show him the path towards correct answer. Give real life Examples of the problem at hand and similar examples of the inconsistency in the users approach and guide him towards the answer , thats the best way to go.',
  safetySettings: safetySettings,
});

// Chat route to handle user messages

app.post('/chat', async (req, res) => {
    const { message, history } = req.body;
  
    try {
      const formattedHistory = (history || []).map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.text }],
      }));
  
      const chat = model.startChat({
        history: formattedHistory,
      });
  
      const result = await chat.sendMessage(message);
  
      // Check for blocked content due to safety issues
      if (result.response.candidates[0]?.safetyMetadata?.blocked) {
        return res.json({
          response: "Koro Sensei is thinking too hard! Please ask another question.",
          history: [...(formattedHistory || []), { role: 'user', text: message }, { role: 'model', text: "Blocked due to safety." }],
        });
      }
  
      res.json({
        response: result.response.text(),
        history: [...(formattedHistory || []), { role: 'user', text: message }, { role: 'model', text: result.response.text() }],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to communicate with Koro Sensei.' });
    }
  });
  
// app.post('/chat', async (req, res) => {
//   const { message, history } = req.body;

//   try {
//     // Create or continue the chat session with history
//     const chat = model.startChat({
//       history: history || [],
//     });

//     // Send user's message to the chatbot
//     const result = await chat.sendMessage(message);

//     // Respond with the chatbot's response
//     res.json({
//       response: result.response.text(),
//       history: [...(history || []), { role: 'user', text: message }, { role: 'koro', text: result.response.text() }],
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to communicate with Koro Sensei.' });
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
