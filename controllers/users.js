const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users.js');

router.post('/', (req, res) => {
  //See if user exists
  User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
          res.status(400).json(error);
      } else if (!user) {
          res.status(404).send('User does not exist');
      } else {
          //compare passwords
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({username: user.username}, process.env.SECRET);
            console.log(token)
            console.log(jwt.verify(token, process.env.SECRET));
            res.status(200).json(token);
          } else {
              res.status(403).send('Wrong Password');
          }
      }
  });
});


router.post('/new', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, user) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(user);
    }
  });
});

module.exports = router;