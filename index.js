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