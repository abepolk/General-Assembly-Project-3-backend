const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


const db = mongoose.connection;










app.listen(PORT, () =>{
    console.log('Mongoose runningo n port ' + PORT);
})