const express = require('express');
const router = express.Router();
const connection = require('../../db');

// POST request to submit a vote on a poll
router.post('/:poll_id/:option_id', (req, res) => {
    try {
        const { poll_id, option_id } = req.params;

        // Check if poll with requested ID exists in database
        pollExists(poll_id, (pollError, pollExists) => {
            if (pollError) {
                return res.status(500).json({
                    code: 500,
                    message: 'Internal Server Error',
                });
            }

            if (!pollExists) {
                return res.status(404).json({
                    code: 404,
                    message: `Poll with ID ${poll_id} does not exist`,
                });
            }
        
            // Get the count of options available for requested poll
        getOptionCount(poll_id, (optionCountError, optionCount) => {
            if (optionCountError) {
                return res.status(500).json({
                    code: 500,
                    message: 'Internal Server Error',
                });
            }

            // Check if option_id provided in the request
            // is within valid range
            if (option_id > optionCount) {
                return res.status(400).json({
                    code: 400,
                    message: `Invalid option ID, poll contains ${optionCount} options`,
                });
            }

            // Check if the option_id is between 1 - 5 
            if (!isValidOption(option_id)) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid option ID. Option ID must be a number between 1 and 5.',
                });
            }

            // Construct and execute SQL query to insert into vote into database
            const query = `INSERT INTO votes (poll_id, option_id) VALUES (?, ?)`;
            const values = [poll_id, option_id];

            connection.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error inserting vote into database', error);
                    return res.status(500).json({
                        code: 500,
                        message: 'Internal Server Error',
                    });
                }

                // Return success message
                res.status(201).json({
                    code: 201,
                    message: 'Vote successful!'
                });
            });
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

//Checking if option is a valid num between 1-5
function isValidOption(option_id) {
    const optionId = parseInt(option_id);
    return !isNaN(optionId) && optionId >= 1 && optionId <= 5;
}

//Check if poll with ID exists
function pollExists(poll_id, callback) {
    const pollQuery = 'SELECT poll_name FROM polls WHERE poll_id = ?';
    connection.query(pollQuery, [poll_id], (error, results) => {
        if (error) {
            console.error(`Error fetching poll from database`, error);
            return callback(error, null);
        }
        callback(null, results.length > 0);
    });
}

//Get number of options for a single poll
function getOptionCount(poll_id, callback) {
    const optionCountQuery = `SELECT COUNT(*) AS optionCount FROM options WHERE poll_id = ?`;
    connection.query(optionCountQuery, [poll_id], (error, results) => {
        if (error) {
            console.error('Error fetching option count from database', error);
            return callback(error, null);
        }
        const optionCount = results.length > 0 ? results[0].optionCount : 0;
        callback(null, optionCount);
    });
}

module.exports = router;
