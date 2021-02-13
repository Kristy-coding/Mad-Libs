const router = require('express').Router();
const { response } = require('express');
const sequelize = require('../config/connection');
const { Story, User, Word } = require('../models');
const { findAll, findOne } = require('../models/User');

// trying to search for stories that are "not null"
const Op = require('sequelize').Op

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

        console.log(story.title)
        //res.render('bootcamp-template');
         //if(story.title.includes("Unicorn Poops"))
        // res.render('completed-templates', {
        //   story,loggedIn: true });
        if(story.title ==='My Coding Bootcamp Experience'){
          res.render('bootcamp-template', {
            story,loggedIn: true });
        }
        if(story.title ==='What Happens when a Unicorn Poops?') {
          res.render('completed-templates', {
            story,loggedIn: true });
        }
      } 
      
      else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})


//GET /dashboard/saved
router.get('/saved', (req, res) => {

  Story.findAll({
    
    where: {
      //id: 
      
      user_id: req.session.user_id,
      text: {[Op.ne]: null}

    },
    include: [
      // include the Word model here:
      {model: Word}
    ] 
  })
    .then(dbStoryData => {
        
      if (dbStoryData) {
      // serialize the data then pass it to render as an object 

        //const story = dbStoryData.get({ plain: true });
        const story = dbStoryData.map(story => story.get({ plain: true }));

        console.log(story)

        res.render('saved-templates', {
          story,loggedIn: true });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

  //res.render('saved-templates',{loggedIn: true});

//   Story.findOne({
//     where: {
//       //text: true,
//       //user_id: req.session.user_id
//       id: 3
//     },
//     include: [
//       {model: Word,},
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//   .then(dbStoryData => {
//     // serialize all the storied using map before passing to template
//     const story = dbStoryData.map(story => story.get({ plain: true }));
//     res.render('saved-templates', { story, loggedIn: true });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });



module.exports = router;