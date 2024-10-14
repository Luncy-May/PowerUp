import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Set up CORS to allow frontend to communicate with the backend
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const api_key = process.env.VOICEFLOW_API_KEY; 
app.post('/api/suggestion/timeManagement', async (req, res) => {
    const { user_query, userID } = req.body
    try {
        const response = await axios.post(
            `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
            {
                request: {
                    type: 'text', 
                    payload: user_query,
                }
            },
            {
                headers: {
                    'Authorization': api_key,
                    'versionID': 'production',
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            },
            {
                config: {
                    tts: false,
                    stripSSML: true,
                    stopAll: false,
                    excludeTypes: ['block', 'debug', 'flow']
                }
            },

        );
        res.json(response.data);
    } catch (error) {
        console.error('Error interacting with Voiceflow:', error);
        res.status(500).json({ message: 'Error getting eco-friendly suggestions, Please try again' });
    }
});

app.post('/api/suggestion/skillsPriority', async (req, res) => {
    const { user_query, userID } = req.body
    try {
        const response = await axios.post(
            `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
            {
                request: {
                    type: 'text', 
                    payload: user_query,
                }
            },
            {
                headers: {
                    'Authorization': api_key,
                    'versionID': 'production',
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            },
            {
                config: {
                    tts: false,
                    stripSSML: true,
                    stopAll: false,
                    excludeTypes: ['block', 'debug', 'flow']
                }
            },

        );
        res.json(response.data);
    } catch (error) {
        console.error('Error interacting with Voiceflow:', error);
        res.status(500).json({ message: 'Error getting eco-friendly suggestions, Please try again' });
    }
});

app.post('/api/suggestion/jobsPriority', async (req, res) => {
    const { user_query, userID } = req.body
    try {
        const response = await axios.post(
            `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
            {
                request: {
                    type: 'text', 
                    payload: user_query,
                }
            },
            {
                headers: {
                    'Authorization': api_key,
                    'versionID': 'production',
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            },
            {
                config: {
                    tts: false,
                    stripSSML: true,
                    stopAll: false,
                    excludeTypes: ['block', 'debug', 'flow']
                }
            },

        );
        res.json(response.data);
    } catch (error) {
        console.error('Error interacting with Voiceflow:', error);
        res.status(500).json({ message: 'Error getting eco-friendly suggestions, Please try again' });
    }
});

app.post('/api/sayHi', async (req, res) => {
    const { userID } = req.body;
    const api_key = process.env.VOICEFLOW_API_KEY; 
    const user_id = userID;
    try {
        const requestPayload = {
            request: { type: 'launch' },  
        };
        // Call Voiceflow API
        const response = await axios.post(
            `https://general-runtime.voiceflow.com/state/user/${user_id}/interact`,
            requestPayload,
            {
                headers: {
                    'Authorization': api_key,
                    'versionID': 'production',
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            }
        );
        // Send the relevant data back to the frontend
        const responseData = response.data;
        res.status(200).json(responseData); // Send only the relevant data (without response metadata)

    } catch (error) {
        console.error('Error interacting with Voiceflow:', error);
        res.status(500).json({ message: 'Error getting connected to AI Agent, please try again' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

