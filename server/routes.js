const express = require('express');
const router = express.Router();
const passport = require('passport')
const appConfig = require('./config');
const redis = require('redis');
const {authStrategy} = appConfig 

// Create redis client
const redisClient = redis.createClient();

// Check if redis is connected
redisClient.on('connect', function() {
  console.log('connected');
});

// App routes for facebook authentication
router.get('/auth/facebook', passport.authenticate(authStrategy));

router.get('/auth/facebook/callback',
  passport.authenticate(authStrategy, { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/app');
    }
);

// Redirect user to login/app page based on logged in Status
router.get('/', (req, res) => {
  !req.user ? res.redirect('/login') : res.redirect('/app')
});

router.get('/userProfile', (req, res, next) => {
  return res.send(req.user)
})

// Logout user
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/app', (req, res, next) => {
 !req.user ? res.redirect('/login') : next();
});

module.exports = {router, redisClient};