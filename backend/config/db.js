const mongoose = require('mongoose')

//database connection
const connectionString = 'mongodb://localhost:27017/members_only'
mongoose.connect(connectionString)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose;