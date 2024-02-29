const express = require('express');
const app = express()
const path = require('path');
const pollRoute = require('./routes/poll');
const voteRoute = require('./routes/vote');

// Serve the files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use('/poll', pollRoute);
app.use('/vote', voteRoute);

// Port number to listen on & start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
