const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;
const cors = require('cors');

const connectMongo = require('./config/database.config');
connectMongo();

app.use(express.json())
app.use(cors())

const postRouter = require('./routers/post.router');

app.use('/api', postRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})