const router = require('express').Router();
const sequelize = require('../config/connection');
const { Story, User, Word } = require('../models');

// GET /dashboard/story/id
router.get('/story/:id', (req, res) => {

    res.render('sample-template');
})



module.exports = router;