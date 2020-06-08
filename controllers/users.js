const express = require('express');
const router = express.Router();
const User = require('../models/users.js');



router.get('/test', async (req, res) =>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    } catch(error){
        res.status(400).json(error);
    }
})
router.post('/create', async (req, res) =>{
    try{
        console.log(req.body);
        const createdUser = await User.create(req.body);
        res.status(200).json(createdUser);
    } catch(error){
        console.log(error)
        res.status(400).json(error);
    }
})

module.exports = router;