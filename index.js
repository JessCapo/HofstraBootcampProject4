// index.js - runs the backend API

// environment variables
require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Connects to React app

// Access to URI
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const DB_NAME = 'behavioral_db'; 

const app = express();

// Middleware
app.use(cors()); // Allows frontend running on different port to connect
app.use(express.json()); // Parses incoming JSON data

// Global MongoDB Client
let db;

// Connect to MongoDB (main secure connection logic)
async function connectToMongo() {
    try {
        const client = await MongoClient.connect(MONGODB_URI);
        db = client.db(DB_NAME);
        console.log(`Successfully connected to MongoDB database: ${DB_NAME}`);
    } catch (error) {
        console.error("FAILED TO CONNECT TO MONGODB:", error);
        // Exit process if database connection fails, as the server is useless without it
        process.exit(1); 
    }
}