//This file, like index.js in the models folder, will serve as a means to collect all of the API routes and package them up for us.

const router = require('express').Router();

// require the files with all of our routes logic 
const userRoutes = require('./user-routes');



//Remember how in user-routes.js we didn't use the word users in any routes? That's because in this file we take those routes and implement them to another router instance, prefixing them with the path /users at that time/ this time...
// why are we not prefixing api/users at this time because we will do that tin the index.js file in the routes directory 

// we are basically saying that for all routes iin the ./user-routes file, prefix them with /users
// for all routes in the ./post-routes file prefix them with /posts
// for all routes in the ./comment-routes file, prefix them with /comments 
router.use('/users', userRoutes);


module.exports = router;