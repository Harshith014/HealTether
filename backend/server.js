const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute');
const { authenticate } = require('./middleware/authMiddleware');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use('/api', authRoute);
// app.use(authenticate);

app.listen(5000, () => {
  console.log('Server listening on port 3000');
});