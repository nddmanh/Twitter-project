const express = require('express');

const app = express();
const PORT = 5000;
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            posts: []
        }
    })
})

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})