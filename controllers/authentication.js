const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/gabble', (request, response) => {
  response.render('login');
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

router.post('/gabble' (request, response) => {
    response.render('/login');
});



module.exports = router;