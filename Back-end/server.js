// Config dotenv
require('dotenv').config();
// Connect DB
const {connectDB} = require('./config/db');

connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            posts: [{
                content: "hello world!!!!"
            }]
        }
    })
})


const PORT = process.env.APP_PORT;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})