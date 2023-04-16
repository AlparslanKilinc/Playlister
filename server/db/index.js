
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });

mongoose
    .connect(process.env.DB_CONNECT, {useUnifiedTopology: true,useCreateIndex: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

