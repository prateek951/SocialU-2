const mongoose = require('mongoose');
const config = require('config');
const DATABASE = config.get('MONGO_URI');

const CONNECT_DATABASE = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error(error.message);
    // Exit the process with failure
    process.exit(1);
  }
};

module.exports = CONNECT_DATABASE;
