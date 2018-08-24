// Get dependencies
const express       = require('express');
const path          = require('path');
const http          = require('http');
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv').config();
const { spawn }     = require('child_process');
const passport      = require('passport');
const mongoose      = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const sendMealORder = require('./server/helpers/meal-schedule');
// Get our API routes
const api = require('./server/routes/api');
const app = express();

//SESSION
const session       = require('express-session');
const MongoStore    = require('connect-mongo')(session);

// Exec ng build command on server start
// const build = spawn('ng', ['build', '--watch']);

const mongooseOptions = {
  "server": {
    "socketOptions": {
      "autoReconnect": 1,
      "keepAlive": 1000,
      "connectTimeoutMS": 30000
    }
  },
};

mongoose.connect('mongodb://localhost/meal_ng', mongooseOptions);

app.use(session({
  secret: 'NG meal',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    db: 'meal_ng',
    url: 'mongodb://localhost/meal_ng',
    ttl: 12 * 60 * 60,
    mongoOptions: {
      "autoReconnect": 1,
      "keepAlive": 1000,
      "connectTimeoutMS": 30000
    }
  }),
  cookie: {
    httpOnly: false
  }
}));

var User = require('./server/models/user');
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({$or:[{ username: username }, {email: username}] }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, `dist`)));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/index.html`));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 4200;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

// process.on('SIGINT', () => {
//   nbuild.kill('SIGINT');
//   process.exit();
// });

sendMealORder.setschedule();
