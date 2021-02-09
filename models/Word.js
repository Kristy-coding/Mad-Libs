// require DataTypes and Model from sequelize
// require the sequelize connection to connect to database in msqul
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//initiate comment class from the sequelize Model so we ge access to all of the the methods the sequelize libaray has that will query to SQL under the hood 
class Word extends Model {}

Word.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    the_word: {
      type: DataTypes.STRING,
      validate: {
          // this means the comment must be at least 1 character long
          len: [1]
      }
    },
    part_of_speech: {
        type: DataTypes.STRING,
        validate: {
            // this means the comment must be at least 1 character long
            len: [1]
        }
    },
      // user_id references the primary key of the user
      // THIS IS A FOREIGN KEY
      // A COMMENT CANNOT EXIST W/O A USER and A POST
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // this references the lowercase  modelName we gave the User in the modal creation
            // saying that the user_id should equal the 'id' of the 'user' aka primary key  
          model: 'user',
          // we are saying that the user_id should match the primary key value of the id in the user model
          key: 'id'
        }
    },
      // post_id references the primary key of the post
      // THIS IS A FOREIGN KEY
      // A COMMENT CANNOT EXIST W/O A USER and A POST 
    story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // this references the lowercase  modelName we gave the Post in the modal creation 
            // we are saying that the post_id should match the primary key value of the id in the post model
          model: 'story',
          key: 'id'
        }
    }
  },
  {
    // sequelize will give us timestamps if we don't turn them to false... we want timestamps for comments so we won't turn them off 
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'word'
  }
);

module.exports = Word;