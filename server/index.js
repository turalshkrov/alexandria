const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_SERVER_URL)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Connection failed!');
  })

app.get('/api', (req, res) => {
  res.send('Welcome Alexandria API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });