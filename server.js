const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const {SECRET, PORT} = process.env;
console.log(process.env);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const cors = require('cors');
const jwt = require('jsonwebtoken');
const token = jwt.sign({cheese: 'gouda'}, SECRET)
console.log(token);


const decoded = jwt.verify(token, SECRET);
console.log(decoded);





/////// Globals
const userController = require('./controllers/users.js');
const contactsController = require('./controllers/contacts.js');

///////// mongoDB setup
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});
db.on('error', (error) => console.log(error.message + 'Error in mongoose.connection'));
db.on('connected', ()=> console.log('Connected to mongo db' , MONGODB_URI));
db.on('disconnected', ()=> console.log('Connection destroyed'));

app.use(express.json());

const whitelist = [
    'http://localhost:1985',
    // Put heroku backend here
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('origin is: ' + origin)
            callback(new Error('Not allowed by CORS'));
        }
    },
};

/////// middleware
app.use(cors(corsOptions)); // TODO put corsOptions in
app.use('/users/', userController);
app.use('/contacts/', contactsController);
app.use(express.json());

///// auth route
app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    if(username === user.username & password === user.password){
        const token = jwt.sign({username}, SECRET);
        console.log(jwt.verify(token, SECRET));
        await res.json(token);
        
    }else{
        res.send('wrong username or password')
    }
})

app.listen(PORT, () =>{
    console.log('Mongoose running on port ' + PORT);
})