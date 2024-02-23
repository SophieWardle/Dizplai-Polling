const express = require('express');
const router = express.Router();
const pollData = require('../PollExample');
const connection = require('../../db');

router.get('/', (req, res) => {
    const query = `
        SELECT polls.poll_id, polls.poll_name, polls.question,
            options.option_id, options.option_text
        FROM polls
        JOIN options ON polls.poll_id = options.poll_id
        `;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching polls from database', error);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Poll not found',
            });
        }

        //format polls
        const polls = {};
        results.forEach(row => {
            if (!polls[row.poll_id]) {
                polls[row.poll_id] = {
                    poll_id: row.poll_id,
                    poll_name: row.poll_name,
                    question: row.question,
                    options: [],
                };
            }
            polls[row.poll_id].options.push({
                option_id: row.option_id,
                option_text: row.option_text,
            });
        });

        const pollArray = Object.values(polls);

        res.status(200).json({
            code: 200,
            polls: pollArray,
        });
    });
});

router.get('/:poll_id', (req, res) => {
    try {
        const { poll_id } = req.params;

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

            const query = `
                SELECT 
                    p.poll_name,
                    o.option_id,
                    o.option_text,
                    COUNT(v.option_id) AS voteCount
                FROM 
                    options o
                LEFT JOIN
                    votes v ON o.option_id = v.option_id
                LEFT JOIN
                    polls p ON o.poll_id = p.poll_id
                WHERE
                    o.poll_id = ?
                GROUP BY
                    o.option_id
                `;
            const values = [poll_id];

            connection.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error fetching vote count from database', error);
                    return res.status(500).json({
                        code: 500,
                        message: 'Internal Server Error',
                    });
                }

                let totalVoteCount = 0;
                const voteCounts = results.map(row => {
                    if (row.option_id !== null) {
                        totalVoteCount += row.voteCount;
                    }
                    return {
                        option_id: row.option_id,
                        option_text: row.option_text,
                        voteCount: row.voteCount,
                    }
                });

                res.status(200).json({
                    code: 200,
                    poll_name: results.length > 0 ? results[0].poll_name : null,
                    totalVoteCount: totalVoteCount,
                    voteCounts: voteCounts,
                });
            });
        });
    } catch (error) {
        console.error('Error fetching vote count', error);
        res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
        });
    }
});

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

module.exports = router;