//include packages and models that we'll need to create the Express.js API endpoints


const router = require('express').Router();
const sequelize = require('../../config/connection');

// authguard middleware to all non GET routes
// with this function we are chekcing to see if the user exists in our database (meaning that they logginIn and have a user_id)
//const withAuth = require('../../utils/auth');

// this will grab the /models.index.js by default 
// we need to require Post and User models 
//In a query to the post table, we would like to retrieve not only information about each post, but also the user that posted it. With the foreign key, user_id, we can form a JOIN, an essential characteristic of the relational data model
const {Story, User, Word} = require('../../models');

// get all stories
// GET /api/story
router.get('/', (req, res) => {
    console.log('======================');
    Story.findAll({
      // Query configuration
      // attributes specifies which coloumns in the Post modale we want to select (created_at is given to us by sequelize)
      // next we'll include the JOIN to the User table. We do this by adding the property include, as shown in the following code... this property takes in an array so that if we needed to we could join information from multiple tables aka make mulitple JOIN statements
      
      // order by post recent posts
      //order: [['created_at', 'DESC']],
      include: [
           // include the Word model here:
          {
            model: Word,
            //order:[['id', 'DESC']], ?? is want to get the array to order differently to render
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
              model: User,
              attributes: ['username']
          }
      ]
    })
    .then(dbStoryData => res.json(dbStoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  
});


//GET single story .../api/story/:id
router.get('/:id', (req, res) => {
    Story.findOne({
      where: {
        id: req.params.id
      },
      include: [
        // include the Comment model here:
        {
          model: Word,
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbStoryData => {
        if (!dbStoryData) {
          res.status(404).json({ message: 'No story found with this id' });
          return;
        }
        res.json(dbStoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST /api/story
// when we use withAuth router.post('/', withAuth,(req, res) => {
    router.post('/',(req, res) => {
        // expects {title: 'some blog title', blog_text:' fjds fjdksla fdjska ', user_id: from request body}
        Story.create({
          title: req.body.title,
          // originally we passed in the user Id from insomnia to test his routes... now this request is being made from a front-end form.
          //user_id: req.body.user_id
          //The user wiil not know their id, but we can get the id from the session
          user_id: req.session.user_id
        })
          .then(dbStoryData => res.json(dbStoryData))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
     });

// GET /api/story/title 
// get all the stories instances with the same title 
router.post('/title', (req, res) => {
          //console.log(req.session)
          
          Story.findAll({
              where: {
                  title: req.body.title,
                  // WHY IS THIS NOT WORKING why is user_id invalid????
                  user_id: req.session.user_id
                  //user_id: req.body.user_id
                  
               },
              // include: [
              //   {
              //     model: Word,
              //     include: {
              //       model: User,
              //       attributes: ['username']
              //     }
              //   },
              //   {
              //     model: User,
              //     attributes: ['username']
              //   }
              // ]
            })
            .then(dbStoryData => res.json(dbStoryData))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
      });

//UPDATE /api/story/:id
  router.put('/:id',(req, res) => {
    Story.update(
      {
        
        text: req.body.text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbStoryData => {
        if (!dbStoryData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbStoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.delete('/:id',(req, res) => {
  Story.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbStoryData => {
      if (!dbStoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbStoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




     module.exports = router;