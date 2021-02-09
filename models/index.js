//This file is responsible for importing the models and exporting objects with the new properties/ relationships associations that we define with dot notation

const User = require('./User');
const Story = require('./Story');
const Word = require('./Word');

// CREATE ASSOCIATIONS/ define relationships between the models/tables...


//This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.
User.hasMany(Story, {
    foreignKey: 'user_id'
});

//We also need to make the reverse association by adding the following statement
//In this statement, we are defining the relationship of the Post model to the User. The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the foreign key, which is designated at user_id in the Post model

Story.belongsTo(User, {
    foreignKey: 'user_id',
});


// Word associations ...


Word.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Word.belongsTo(Story, {
    foreignKey: 'story_id'
});
  
User.hasMany(Word, {
    // so here we are saying that the comments should have a foreign key 'user_id' that references the user 'id'
    foreignKey: 'user_id'
});
  
Story.hasMany(Word, {
    // here we are saying that the comments should also have a foreign key 'post_id' that references the post 'id' so we know which post the comment is attached to
    foreignKey: 'story_id',
    
});


// now we exports these objects that know have new properties attached to them (aka the relationship and association we made)
module.exports = { User, Story, Word };