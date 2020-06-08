const express = require('express');
const router = express.Router();
const User = require('../models/users.js');



router.get('/', async (req, res) =>{
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


router.delete('/:id/delete', async (req, res) =>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser);
    }catch(error){
        res.status(400).json(error);
    }
})

router.put('/:id/update', async (req, res) =>{
    try{
        console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(400).json(error);
    }
})

module.exports = router;