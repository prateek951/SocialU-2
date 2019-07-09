const express = require('express');
const CONNECT_DATABASE = require('./config/db');
const app = express();

// Connect to the database
CONNECT_DATABASE();

app.get('/', (req, res) => {
  res.send('API Running');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Magin on port : ${port}`);
});
