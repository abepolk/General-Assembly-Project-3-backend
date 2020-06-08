const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const cors = require('cors');



app.use(cors());

/////// Globals
const userController = require('./controllers/users.js');


///////// mongoDB setup
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});
db.on('error', (error) => console.log(error.message + 'Error in mongoose.connection'));
db.on('connected', ()=> console.log('Connected to mongo db' , MONGODB_URI));
db.on('disconnected', ()=> console.log('Connection destroyed'));

app.use(express.json());

/////// middleware
app.use('/users/', userController);




app.listen(PORT, () =>{
    console.log('Mongoose running on port ' + PORT);
})