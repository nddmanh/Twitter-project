// Config dotenv
require('dotenv').config();
// Connect DB
const {connectDB} = require('./configs/db');

connectDB();

const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

// Mount the route
app.use('/api/v1/auth', authRoute);


const PORT = process.env.APP_PORT;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})