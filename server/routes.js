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
  passport.authenticate(authStrategy, { successRedirect: '/app/home', failureRedirect: '/login' })
);

// Redirect user to login/app page based on logged in Status
router.get('/', (req, res) => {
  !req.user ? res.redirect('/login') : res.redirect('/app/home')
});

// Get user profile on login
router.get('/userProfile', (req, res, next) => {
  console.log(req.user)
  redisClient.hgetall(`userProfile:${req.user}`, (error, result) => {
    error ? console.log('Unable to fetch user profile') : res.send(result)
  }); 
});

// Logout user
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/app', (req, res, next) => {
 !req.user ? res.redirect('/login') : res.redirect('/app/home');
});

module.exports = {router, redisClient};