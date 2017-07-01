const express = require('express');
const router = express.Router();
const models = require('../models');

// var request.session.authenticateUser = true;
     
router.get('/gabble', (request, response) => {

    if (request.session.isAuthenticated === true) {
    response.redirect('/homepage');
    }
    else {
    response.redirect('/login');
    }
});

router.get('/login', (request, response) => {
    response.render('login');
});

router.post('/login', async (request, response) => {
  var username = request.body.username;
  var password = request.body.password;
  validationErrors = [];
  var existingUser = await models.users.findOne({
    where: { username: username, password: password }
  });
  if (!existingUser) {
    validationErrors.push({"msg": "Invalid username and password."}); 
    response.render('login', {errors: validationErrors});
  } 
  else {
    request.session.isAuthenticated = true;
    request.session.username = request.body.username;
    response.redirect('/');
  }
});

router.get('/signup', (request, response) => {
    response.render('signup')
});

router.get('/likes', (request, response) => {
    response.render('likes')
});

router.get('/newgab', (request, response) => {
    response.render('newgab')
});

router.get('/homepage', (request, response) => {
    response.render('homepage')
});

// router.post('/homepage' (request, response) => {

//     request.checkBody('username', 'Username is invalid').notEmpty;
//     request.checkBody('password', 'Password is unvalid').notEmpty;

//     var errors = req.validationErrors();
//     if (errors) {
//       var html = errors;
//       response.render();
//     } else {
//       var user = req.body.user;
//       var html = '<p>Your user name is: </p>' + user;
//       res.send(html);
//     };
// });



module.exports = router;