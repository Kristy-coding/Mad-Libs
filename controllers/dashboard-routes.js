const router = require('express').Router();
const sequelize = require('../config/connection');
const { Story, User, Word } = require('../models');

// put this script in the mainhandlebars toa access this render
// GET /dashboard
// here we want to get all stories 
router.get('/', (req, res)=>{
    res.render('choose-template')
})


//GET /dashboard/story/id
//to get story id we have to search all titles of the same name then get the last story in the array and grab the id
router.get('/story/:id', (req, res) => {

    res.render('first-template');

});



module.exports = router;