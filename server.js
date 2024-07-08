const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/sendMessage', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api-bcbe5a.stack.tryrelevance.com/latest/studios/915d9ac3-8e0e-4ec6-ad6f-0e34b3c9be15/trigger_limited', {
            params: {
                text: message
            },
            project: '92f5659c9109-455f-b8e3-49e7c62ff501'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '92f5659c9109-455f-b8e3-49e7c62ff501:sk-YjE3MWZmMjYtOWYzYi00MjJiLTk5NGQtNDkzNDNiNTZiYTBk'
            }
        });

        // Enviar la respuesta de vuelta al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
