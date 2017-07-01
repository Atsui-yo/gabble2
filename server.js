const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator');
const gabbleControllers = require('./controllers/authentication');

const application = express();
const port = 3000;

application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: false,
}));

application.use(function(request, response, next) {
    if (request.session.isAuthenticated === undefined) {
        request.session.isAuthenticated = false;
    }
    next();
});

application.use(express.static('public'));

application.use(bodyParser.urlencoded({ extended: false }));
application.use(expressValidator());

application.use(gabbleControllers);

application.listen(port);