const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/gabble', (request, response) => {
  if (request.session.authenticatedUser === true) {
    response.render('/homepage');
  }
  else {
    response.redirect('/login');
  }
});


router.get('/homepage', (request, response, next) => {
  // if (request.session.isAuthenticated === true) {
    var messages = models.Messages.findAll(
      { include: [models.Users] }
    );
    console.log(messages);
    response.render('homepage', {username: request.session.username, messages: messages});
  // }
  // else {
  //   response.redirect('/login');
  // }
  next();
});

module.exports = router;