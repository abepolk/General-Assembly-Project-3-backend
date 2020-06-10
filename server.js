const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const {SECRET, PORT} = process.env;
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




////// authorize function 
const auth = (req, res, next) =>{
const {authorization} = req.headers
    if(authorization){
        const token = authorization.split(' ')[1]
        console.log('TOKEN EQUALS ' + token);
        const result = jwt.verify(token, SECRET);
        req.user = result;
        console.log('REQ.USER = result ' + req.user);
        next();
    }else{
        res.send('No Tokens ever');
    }
}

///////// mongoDB setup
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});
db.on('error', (error) => console.log(error.message + 'Error in mongoose.connection'));
db.on('connected', ()=> console.log('Connected to mongo db' , MONGODB_URI));
db.on('disconnected', ()=> console.log('Connection destroyed'));

app.use(express.json());


/////// middleware
app.use(cors());
app.use('/users/', userController);
app.use('/contacts/', contactsController);
app.use(express.json());




/////// dummy user
const user = {username: 'Phil', password: 'p'}

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


///// test route
app.get('/test', auth, (req, res) =>{
    res.send(req.user);
})

app.listen(PORT, () =>{
    console.log('Mongoose running on port ' + PORT);
})