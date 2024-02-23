const express = require('express');
const app = express()
const pollData = require('./PollExample');
const connection = require('../db');

app.get('/poll', (req, res) => {
    res.json(pollData);
})

app.post('/poll/:poll_id/:option_id', (req, res) => {
    try {
        const { poll_id, option_id } = req.params;

        // Need to ensure that the option_id is not greater
        // than the number of actual options
        // Hardcoded poll data for now so option id no greater than 3
        if (option_id > 3){
            return res.status(400).json({
                code: 400,
                message: 'Invalid option ID, poll contains 3 options',
            });
        }

        if (!isValidOption(option_id)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid option ID. Option ID must be a number between 1 and 5.',
            });
        }

        const query = `INSERT INTO votes (poll_id, option_id) VALUES (?, ?)`;
        const values = [poll_id, option_id];

        console.log('Executing Query:', query, 'with values:', values);

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Error inserting vote into database', error);
                return res.status(500).json({
                    code: 500,
                    message: 'Internal Server Error',
                });
            }

            res.status(201).json({
                code: 201,
                message: 'Vote successful!'
            });
        });
    } catch (error) {
        console.error('Error during voting:', error);
        res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
        });
    }
});

function isValidOption(option_id) {
    // Check if option_id is a number between 1 and 5
    const optionId = parseInt(option_id);
    return !isNaN(optionId) && optionId >= 1 && optionId <= 5;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});