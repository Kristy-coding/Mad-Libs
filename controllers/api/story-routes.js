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
      attributes: ['id','title', 'created_at'],
      // order by post recent posts
      order: [['created_at', 'DESC']],
      include: [
           // include the Word model here:
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
    .then(dbStoryData => res.json(dbStoryData))
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




     module.exports = router;