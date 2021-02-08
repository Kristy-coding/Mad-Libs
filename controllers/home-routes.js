//This file will contain all of the user-facing routes that render templates and display data (such as the homepage and login page/ sign up page)

// have to connect to the database anytime we are making queries 
const sequelize = require('../config/connection');
const { User } = require('../models');


const router = require('express').Router();


//Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.
// so if you navigate to http://localhost:3001 the homepage should be rendered 
//GET /
router.get('/', (req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn})
});


router.get('/login', (req, res) => {
    // when the user navigates to the homepage by clicking the nav link... we will check to see if they are already logginIn. If they are we will redirect them to the homepage instead of taking them to the login page

    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    //Our login page doesn't need any variables, so we don't need to pass a second argument to the render() method.
    //What's different about this render() from last time? Our login page doesn't need any variables, so we don't need to pass a second argument to the render() method
    res.render('login')
});

router.get('/signup', (req, res) => {
    
    //What's different about this render() from last time? Our login page doesn't need any variables, so we don't need to pass a second argument to the render() method
    res.render('signup')
});

module.exports = router;