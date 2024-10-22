# Project Setup Instructions

## Overview

This project requires importing a database from an SQL file and configuring environment variables to match your setup. Follow the steps below to get the project up and running.

## Setup Guide

### 1. Import the Database

1. Locate the provided `bookstore.sql` file.
2. Run the following command in your terminal to create the database and import the data:

   ```bash
   mysql -u <username> -p < path_to_sql_file.sql
   ```

### 2. Update Environment Variables

1. Open the .env file located in the root of the project.
2. Update the following fields to match your MySQL setup:
   DB_NAME
   DB_USER
   DB_PASSWORD

### 3. Import Postman Documentation
1. Import the Postman collection to test API requests by using the following link:
    https://documenter.getpostman.com/view/21416781/2sAXxY4UCa
2. Open the link, click on "Run in Postman" on the top-right corner of the screen, and import the collection.
3. Select the "bookstore" environment in Postman, and you're ready to go.

### 4. Run the Code

1. Install the necessary dependencies using your preferred package manager (if applicable):
   npm install
2. Run the project using the following command:
   npm start

