const express = require('express');
const cors = require('cors');

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

const PORT = 5000;
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

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})