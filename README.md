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

1. Navigate to project directory in the terminal: `cd Dizplai-Polling`
2. Navigate into the API folder: `cd api`
3. Start app.js: `node app.js`

# For web app:
In your browser URL: http://localhost:3000/index.html

# For API

In Postman, the API can be tested through the following URLS:

Get Request For Retrieving the Poll
GET `http://localhost:3000/poll`

Posting a New Vote
POST `http://localhost:3000/vote/poll_id/option_id`
Replacing poll_id and option_id with the actual ID's
There is only 1 poll with 3 options so /1/1 - /1/3, but it should give appropriate error messages when wrong.

Get Poll by ID
GET `http://localhost:3000/poll/poll_id`
Replacing poll_id with the actual ID.
There is only one poll so /poll/1, but should give appropriate error messages when wrong.

## Downloads 

1. [Postman] for API testing
2. [XAMPP] for MySQL, Apache, PHPMyAdmin

Dependencies: Node.js and Node Package Manager if not already installed