
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
mongoose.set('useUnifiedTopology', true)
mongoose
    .connect(process.env.DB_CONNECT,{useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

