const express = require('express');
const CONNECT_DATABASE = require('./config/db');
const path = require('path');
const app = express();

// Connect to the database
CONNECT_DATABASE();

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// body parser middleware
app.use(express.json({ extended: false }));

//define the routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set the static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Magic on port : ${port}`);
});
