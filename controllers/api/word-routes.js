const router = require('express').Router();
const { Word } = require('../../models');


// authguard middleware to all non GET routes
// with this function we are chekcing to see if the user exists in our database (meaning that they logginIn and have a user_id)
//const withAuth = require('../../utils/auth');


//GET /api/word
router.get('/', (req, res) => {
    Word.findAll({})
    .then(dbWordData => res.json(dbWordData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// POST /api/word
router.post('/',(req, res) => {
    console.log(req.session);
  // check the session
  //Wrapping the Sequelize queries in if (req.session) statements ensures that only logged-in users interact with the database
  // if you are not loggin in it wont let you create??
  //if (req.session) {
    Word.create({
      the_word: req.body.the_word,
      part_of_speech: req.body.part_of_speech,
      story_id: req.body.story_id,
      // use the id from the session.. we are telling the server to grab the id that is saved in the session when the user logs in or signs up
      // there for when we make a comment post request from the front end we only need to send comment_text and post_id information from the user
      user_id: req.session.user_id
      //user_id: req.body.user_id
    })
      .then(dbWordData => res.json(dbWordData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  //}
});




module.exports = router;