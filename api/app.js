const express = require('express');
const app = express()
const pollRoute = require('./routes/poll');
const voteRoute = require('./routes/vote');

app.use('/poll', pollRoute);
app.use('/vote', voteRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});