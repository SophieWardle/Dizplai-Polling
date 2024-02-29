# Dizplai-Polling Web App

## Overview

This is a simple 2-page web application utilising a RESTful API, allowing users to vote on a poll. Once users have voted, they are taken to a confirmation page showing the percentage of votes for each option.

I created a database and used the example poll as poll table data. Votes are stored using the database rather than local storage.

## Installation

1. Clone the repository: `git clone https://github.com/SophieWardle/Dizplai-Polling.git` or from my GitHub repo, click "Code" button, "Download Zip", extract to local machine
2. Navigate to the project directory: `cd Dizplai-Polling`
3. Install the dependencies: `npm install`

## Database Setup

1. In XAMPP Control Panel, start the Apache and MySQL services
2. On the MySQL row, click "Admin", or navigate to `http://localhost/phpmyadmin/index.php`
3. Import the SQL script into your MySQL // Run the SQL script. SQL script in `api/dizplai-voting.sql`

## Database Configuration

The credentials for the database are in `db.js` within the root project folder.

These can be configured to match your database setup, the default is:

Host: localhost
User: root
Password:
Database: dizplai-voting

## Running the Project

![Command line running project](running.png)

1. Navigate to project directory in the terminal: `cd Dizplai-Polling`
2. Navigate into the API folder: `cd api`
3. Start app.js: `node app.js`

XAMPP services must still be running to work.

**For web app:**
In your browser URL: http://localhost:3000/index.html

Takes you to the homepage where it gets the poll to vote on.
You must select an option in order to submit.
Only one option can be selected at a time, and the selected option is highlighted.
Once submitted, you are shown the percentage of votes for each option.
Clicking the Dizplai logo on the confirmation page will take you back to index.

**For API**

I have exported and added my collection from Postman for testing the API.
The json file is called `Dizplai-Voting.postman_collection.json` which can be imported into Postman by going into 'File' and clicking 'Import'

In Postman, the API can be tested through the following URLS:

Retrieving the Poll
GET `http://localhost:3000/poll`
No parameters, just a simple get request.
Response:
"code": 200,
    "polls": [
        {
            "poll_id": 1,
            "poll_name": "Premier League Winner",
            "question": "Who will win the Premier League?",
            "options": [
                {
                    "option_id": 1,
                    "option_text": "Manchester City"
                },
                {
                    "option_id": 2,
                    "option_text": "Arsenal"
                },
                {
                    "option_id": 3,
                    "option_text": "Liverpool"
                }
            ]
        }
    ]

Posting a New Vote
POST `http://localhost:3000/vote/poll_id/option_id`
Replacing poll_id and option_id with the actual ID's for URL parameters.
Specifying which poll and which option user is voting for.
There is only 1 poll with 3 options so /1/1 - /1/3, but it should give appropriate error messages when wrong.

Get Poll by ID
GET `http://localhost:3000/poll/poll_id`
Replacing poll_id with the actual ID for URL parameter.
There is only one poll so /poll/1, but should give appropriate error messages when wrong.

## Downloads 

1. [Postman] for API testing
2. [XAMPP] for MySQL, Apache, PHPMyAdmin

Dependencies: Node.js and Node Package Manager if not already installed