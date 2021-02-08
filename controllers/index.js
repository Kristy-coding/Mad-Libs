
//here we are collecting the packaged group of API endpoints and homeRoute endpoints and prefixing them with the path /api or other

//Now when we import the routes to server.js (via the ./controller/index path), they'll already be packaged and ready to go with this one file!

const router = require('express').Router();

// require all routes from the ./api/index folder (aka userRoutes, postRoutes, commentRoutes there used by the router and then exported by the router)
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

//const dashboardRoutes = require('./dashboard-routes');

// middleware to tell what prefixes our routes will use..........................
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);

//This is so if we make a request to any endpoint that doesn't exist, we'll receive a 404 error indicating we have requested an incorrect resource, another RESTful API practice.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;