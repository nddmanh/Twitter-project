// Config dotenv
require('dotenv').config();
// Connect DB
const {connectDB} = require('./configs/db');

connectDB();

const express = require('express');
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

const {errorHandler} = require('./middlewares/errorHandler');

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

// Mount the route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

// Unhandler Route
app.all('*', (req, res, next) => {
    const err = new Error('The router can not be found');
    err.statusCode = 404;
    next(err);
})
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})