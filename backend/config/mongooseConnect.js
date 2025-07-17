const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
const configs = require('config')

mongoose.connect(`${configs.get("MONGODB_URI")}/jabsy`)
.then(() => dbgr('Connected to MongoDB'))
.catch((err)=> dbgr('Error connecting to MongoDB:', err));


module.exports = mongoose.connection;