const router = require('express').Router();
const { response } = require('express');
const sequelize = require('../config/connection');
const { Story, User, Word } = require('../models');
const { findAll, findOne } = require('../models/User');



// put this script in the mainhandlebars toa access this render
// GET /dashboard
// here we want to get all stories 
router.get('/', (req, res)=>{
    res.render('choose-template', {loggedIn: true})
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
              story, loggedIn: true });
          } else {
            res.status(404).end();
          }
        })
        .catch(err => {
          res.status(500).json(err);
        });

});

router.get(`/story/generate/:id`, (req, res) => {

 

  Story.findOne({
    
    where: {
      id: req.params.id
    },
    include: [
      // include the Word model here:
      {model: Word}
    ] 
  })
    .then(dbStoryData => {
        
      if (dbStoryData) {
      // serialize the data then pass it to render as an object 

        const story = dbStoryData.get({ plain: true });

        console.log(story)

        res.render('completed-templates', {
          story,loggedIn: true });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})


//GET /dashboard/saved
router.get('/saved', (req, res) => {

  res.render('saved-templates',{loggedIn: true});

  // Story.findAll({
  //   where: {
  //     text: true,
  //     user_id: req.session.user
  //   },
  //   include: [
  //     {
  //       model: Word,
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  // .then(dbStoryData => {
  //   // serialize all the storied using map before passing to template
  //   const story = dbStoryData.map(story => story.get({ plain: true }));
  //   res.render('saved-templates', { story, loggedIn: true });
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});



module.exports = router;