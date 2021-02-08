//This file is responsible for importing the models and exporting objects with the new properties/ relationships associations that we define with dot notation

const User = require('./User');


// CREATE ASSOCIATIONS/ define relationships between the models/tables...


//This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.

// user had many words?? we need to figure out what a post consists of ... a template or a word and then does a word behave like a comment if the tempate is the post or do words just get tagged with parts of speech??

// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

//We also need to make the reverse association by adding the following statement
//In this statement, we are defining the relationship of the Post model to the User. The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the foreign key, which is designated at user_id in the Post model

// Post.belongsTo(User, {
//     foreignKey: 'user_id',
// });


module.exports = { User };