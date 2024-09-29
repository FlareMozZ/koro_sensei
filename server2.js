require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Mistral } = require('@mistralai/mistralai');

// Initialize Mistral client
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let chatHistory = [];  // Save history in-memory or use a database for persistence

app.post('/chat', async (req, res) => {
    const { message, history, temperature = 0.7, top_p = 1, max_tokens = 100, stop = undefined } = req.body;

    try {
        // Log incoming history for debugging
        console.log('Incoming history:', history);

        // Format the message history, renaming "model" to "assistant"
        const formattedHistory = (history || chatHistory).map((entry) => {
            // Rename role "model" to "assistant"
            if (entry.role === "model") {
                entry.role = "assistant"; // Change role to assistant
            }
            // Validate role
            if (!["user", "assistant", "system", "tool"].includes(entry.role)) {
                throw new Error(`Invalid role: ${entry.role}`);
            }
            return {
                role: entry.role,
                content: entry.text,
            };
        });

        // Add Koro Sensei prompt as a system instruction
        formattedHistory.unshift({
            role: 'system',
            content: `You are Socrates, the stoic guru who guides lost people towards the right answers. You believe people should reach their own answers by asking follow-up questions relevant to the problem at hand.`,
        });

        // Validate and format the `stop` parameter if it exists
        const validStop = Array.isArray(stop) || typeof stop === 'string' ? stop : undefined;

        // Send request to Mistral's chat completion endpoint
        const chatResponse = await client.chat.complete({
            model: "mistral-large-latest",
            messages: [
                ...formattedHistory,
                { role: 'user', content: message }  // User's current message
            ],
            temperature,    // Control randomness
            top_p,          // Nucleus sampling
            max_tokens,     // Limit response length
            stop: validStop, // Valid stop sequences, or omit if invalid
        });

        // Extract the bot's response
        const botResponse = chatResponse.choices[0].message.content;

        // Save the conversation history
        chatHistory.push({ role: 'user', text: message });
        chatHistory.push({ role: 'assistant', text: botResponse });

        // Send the response back to the frontend
        res.json({
            response: botResponse,
            history: [
                ...formattedHistory,
                { role: 'user', text: message },
                { role: 'assistant', text: botResponse },
            ],
        });
    } catch (error) {
        console.error('Mistral API error:', error);
        res.status(500).json({ error: 'Failed to communicate with Koro Sensei.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
