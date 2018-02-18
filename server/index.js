
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const passport = require('passport')
const session = require('express-session')
const strategy = require('passport-facebook').Strategy;
const appConfig = require('../assets/js/config');
const { appId, appSecret, authStrategy, url} = appConfig 
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port);

// Initialize session
app.use(session({
  secret: 'leo10cr7',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// Initialize passport
app.use(passport.initialize());

// Use seession with passport
app.use(passport.session());

// App routes for facebook authentication
app.get('/auth/facebook', passport.authenticate(authStrategy));

app.get('/auth/facebook/callback',
  passport.authenticate(authStrategy, { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/app');
    }
);

// Redirect user to login/app page based on logged in Status
app.get('/', (req, res) => {
  !req.user ? res.redirect('/login') : res.redirect('/app')
})

app.get('/app', (req, res, next) => {
  !req.user ? res.redirect('/login') : next();
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Use passport js middleware for facebook authentication
  passport.use (new strategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: `/auth/facebook/callback`
  },
    function(accessToken, refreshToken, profile, cb) {
      if(profile) {
        let user = profile;
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    }
  ))

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  })
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
