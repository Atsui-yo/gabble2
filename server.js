const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');

const bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator');

const authenController = require('./controllers/authentication');

const application = express();
const port = 3000;

application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(session({
    secret: 'gabble',
    resave: true,
    saveUninitialized: true,
}));

application.use(function(request, response, next) {
    if (request.session.authenticatedUser === undefined) {
        request.session.authenticatedUser = false;
    }

    next();
});

application.use(express.static('public'));

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.use(expressValidator());

application.use(authenController);
// application.use(homepageController);

application.listen(port);