const express = require('express');
const router = express.Router();
const pollData = require('../PollExample');
const connection = require('../../db');

router.get('/', (req, res) => {
    res.json(pollData);
})

router.get('/:poll_id', (req, res) => {
    try {
        const { poll_id } = req.params;

        const query = `
            SELECT 
                COUNT(*) AS totalVoteCount,
                option_id,
                COUNT(*) AS voteCount
            FROM 
                votes 
            WHERE
                poll_id = ?
            GROUP BY
                option_id
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
                    voteCount: row.voteCount,
                }
            });

            res.status(200).json({
                code: 200,
                totalVoteCount: totalVoteCount,
                voteCounts: voteCounts,
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

module.exports = router;