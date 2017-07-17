const express = require('express');
const router = express.Router();
const async = require('async')
const models = require('../models');

// var request.session.authenticatedUser = true;
     
router.get('/gabble2', (request, response) => {

    if (request.session.authenticatedUser === true) {
        response.redirect('/homepage');
    }
    else {
        response.redirect('/login');
    };
});

router.get('/login', (request, response) => {

    if (request.session.authenticatedUser === true) {
        response.redirect('/homepage');
    }
    else {
        response.render('login');
    }
});

router.post('/login', async (request, response) => {

    var username = request.body.username;
    var password = request.body.password;

    var validationErrors = [];
    
    var registeredUser = await (models.Users.findOne({
        where: { username: username, password: password }
    }));

    if (!registeredUser) {

         validationErrors.push({"message": "Your username and password is invalid."});
         return response.redirect('/login', {errors: validationErrors});
    } 
    else {
        request.session.authenticatedUser = true;
        request.session.username = request.body.username;
        response.redirect('/homepage');
    }
    
});

router.get('/signup', (request, response) => {
    if (request.session.authenticatedUser === true) {
        response.redirect('/gabble2');
    }
    else {
        response.render('signup');
    }

});

router.post('/signup', async (request, response) => {
    
    var name = request.body.name;
    var username = request.body.username;
    var password = request.body.password;

    var validationErrors = [];
    
    request.checkBody('name', 'Enter a name to display.').notEmpty();
    request.checkBody('username', 'Enter a username.').notEmpty();
    request.checkBody('password', 'Enter a password.').notEmpty();
    request.checkBody('confirmPass', 'Passwords do not match.').equals(request.body.password);

    validationErrors = (request.validationErrors());
    var registeredUser = await models.Users.findOne({
        where: { username: username }
    });

    if (registeredUser || validationErrors) {
        if(!registeredUser) {
            validationErrors = [{"message": "Username is already taken."}];
            
        }
        return response.render('signup', {errors: validationErrors});
        
    }
    else {
        models.Users.create({
            name: request.body.name,
            username: request.body.username,
            password: request.body.password
        });
        request.session.authenticatedUser = true;
        request.session.username = request.body.username;
        response.redirect('/gabble2');
    };
      
});

router.get('/homepage', (request, response) => {

    var messages = models.Messages.findAll({
        where: {
            Messages: [models.Users]
        }
    })
    response.render('homepage', {username: request.session.username, messages: messages});

});

router.get('/logout', (request, response) => {
  request.session.authenticatedUser = false;
  response.redirect('/login');
});



module.exports = router;