const router = require('express').Router();

// requiring ../../models will actually connect to index.js be default, it will always look an index file if a more specific path isn't defined ../../models/index.js
// when we require from index we are getting the models we defined and also the properties and methods we creating to define the relationships between the models 
const {User} = require('../../models');

// GET/api/users
router.get('/', (req, res)=> {
    // Access our User model and run .findAll() method
    // set up the API endpoint so that when the client makes a GET request to /api/users, we will select all users from the user table in the database and send it back as JSON
    //As mentioned before, the User model inherits functionality from the Sequelize Model class. .findAll() is one of the Model class's methods. The .findAll() method lets us query all of the users from the user table in the database, and is the JavaScript equivalent of the following SQL query ... SELECT * FROM users;
    User.findAll({
        //we've provided an attributes key and instructed the query to exclude the password column It's in an array because if we want to exclude more than one, we can just add more.
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// GET /api/users/:id
// when we make a get request to an individual user we want to see the user information as well as have access to information requarding the posts they've created and the comments they have made. We do this by 'including' aka 'joining' the data tables
// sequelize .findONe() method is equl to the sql query... SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        // include: [
        //      {
        //       model: Post,
        //       attributes: ['id', 'title','blog_text', 'created_at']
        //      },
        //      // include the Comment model here, which also needs to include the post model in the context of the comment so we know what post they were commenting on
        //     {
        //         model: Comment,
        //         attributes: ['id', 'comment_text', 'created_at'],
        //         include: {
        //         model: Post,
        //         attributes: ['title']
        //         }
        //     }
        //   ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
// on the front end we are going to create a user by 'signing up', therefore when we create a user they will be loggedin and we need to save the session 
router.post('/', (req, res) => {
    // expects {username: 'Lernantine', email: 'lernantindo@gmail.com', password:'password1234'} from api fetch call
    // to insert data we can use Sequelizze .create() method 
    // in SQL this command would look like ... INSERT INTO users (username, email, password) VALUES  ("Lernantino", "lernantino@gmail.com", "password1234");

    // when we made the user model we attached a sequelize hook in the model that makes sure the password gets hashed before the user is created in the database 
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // using express session package we set up on the server page we can track/save the session by setting the status to logginIn= true and setting the session id and username equal to the user.id and user.username ... is logginIn is set to false we are no longer saving session?
    // once we have the user data we create a session 
    //This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
    //We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
      })  
});

//In this case, a login route could've used the GET method since it doesn't actually create or insert anything into the database. But there is a reason why a POST is the standard for the login that's in process.

//A GET method carries the request parameter appended in the URL string, whereas a POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server. Remember, the password is still in plaintext, which makes this transmission process a vulnerable link in the chain.

// POST api/user/login
router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

  router.post('/logout', (req, res) => {
    // when a user clicks logout we delete the session with .destroy()

    
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
        
     }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'} from request
    // if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
    // so update according to what the user put in the request body where the parameter id indicates
    //This .update() method combines the parameters for creating data and looking up data. We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.
    //The associated SQL syntax would look like the following code...
    //UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;
    User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }, 
    {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => { 
        if (!dbUserData){
            res.status(404).json({message: 'No user found with that id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        // if there is data return the data in the form of json
        res.json(dbUserData);
    })
    // catch error with server
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;