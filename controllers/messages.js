router.get('/newgab', (request, response) => {
    if (request.session.authenticatedUser === true) {
        response.render('post', {username: request.session.username});
    }
    else {
        response.render('login');
    }
});