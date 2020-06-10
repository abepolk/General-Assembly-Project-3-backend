const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users.js');

router.post('/', (req, res) => {
  //See if user exists
  User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
          res.send(error);
      } else if (!user) {
          res.send('user does not exist');
      } else {
          //compare passwords
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({username: user.username}, process.env.SECRET);
            console.log(jwt.verify(token, process.env.SECRET));
            res.json(token);
          } else {
              res.send('Wrong Password');
          }
      }
  });
});


// router.post('/new', (req, res) => {
//   //// req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//   User.create(req.body, (error, user) => {
//     if (error) {
//       console.error(error);
//     } else {
//       let createdUser = json(req.body);
//       return createdUser;
//     }
//   });
//   res.json(createdUser)
// });
router.post('/new', async (req, res) =>{
  try{
    const createdUser = await User.create(req.body);
    res.status(200).json(createdUser);
  }catch(error){
    console.log(error);
    res.status(400).json(error);
  }
})

// Remove user account functionality

// router.delete('/:id/delete', async (req, res) =>{
//     try{
//         const deleteUser = await User.findByIdAndDelete(req.params.id);
//         res.status(200).json(deleteUser);
//     }catch(error){
//         res.status(400).json(error);
//     }
// })

module.exports = router;