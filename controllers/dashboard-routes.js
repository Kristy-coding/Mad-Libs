const router = require('express').Router();
const sequelize = require('../config/connection');
const { Story, User, Word } = require('../models');
const { findAll, findOne } = require('../models/User');



// put this script in the mainhandlebars toa access this render
// GET /dashboard
// here we want to get all stories 
router.get('/', (req, res)=>{
    res.render('choose-template')
})


//GET /dashboard/story/id
//to get story id we have to search all titles of the same name then get the last story in the array and grab the id
router.get(`/story/:id`, (req, res) => {


    ///res.render('fill-template');

    Story.findOne({
    
        where: {
          id: req.params.id
        }  
      })
        .then(dbStoryData => {
            
          if (dbStoryData) {
          // serialize the data then pass it to render as an object 

            const story = dbStoryData.get({ plain: true });

            console.log(story)

            res.render('fill-template', {
              story
            });
          } else {
            res.status(404).end();
          }
        })
        .catch(err => {
          res.status(500).json(err);
        });

});



module.exports = router;