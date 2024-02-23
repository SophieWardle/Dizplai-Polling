const express = require('express');
const app = express()
const pollData = require('./PollExample');

app.get('/poll', (req, res) => {
    res.json(pollData);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});