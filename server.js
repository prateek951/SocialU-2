const express = require('express');
const CONNECT_DATABASE = require('./config/db');
const app = express();

// Connect to the database
CONNECT_DATABASE();

app.get('/', (req, res) => {
  res.send('API Running');
});

// body parser middleware
app.use(express.json({ extended: false }));

//define the routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Magin on port : ${port}`);
});
