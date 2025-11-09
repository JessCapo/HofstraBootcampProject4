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

//API Endpoints
// POST /api/intake: Handles the Intake Form Submission
app.post('/api/intake', async (req, res) => {
    const intakeData = req.body;
    try {
        if (!db) {
            return res.status(503).json({ message: "Database connection not available." });
        }
        
        // Insert data into the 'intakes' collection
        const result = await db.collection('intakes').insertOne({
            ...intakeData,
            createdAt: new Date()
        });
        
        // Success response
        res.status(201).json({ message: "Intake saved successfully", id: result.insertedId });

    } catch (error) {
        console.error("Error saving intake data:", error);
        res.status(500).json({ message: "Failed to save intake data." });
    }
});

// POST /api/qa-log: Handles logging the Q&A transaction
app.post('/api/qa-log', async (req, res) => {
    const logData = req.body;
    try {
        if (!db) {
            return res.status(503).json({ message: "Database connection not available." });
        }
        
        // 5. Insert data into the 'qa_logs' collection
        await db.collection('qa_logs').insertOne({
            ...logData,
            createdAt: new Date()
        });

        res.status(200).json({ message: "Q&A Logged." });

    } catch (error) {
        console.error("Error saving Q&A log:", error);
        res.status(500).json({ message: "Failed to log QA session." });
    }
});

// Start the server only after connecting to the database
connectToMongo().then(() => {
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
    });
});
