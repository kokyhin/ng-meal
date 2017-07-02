// Get dependencies
const express       = require('express');
const path          = require('path');
const http          = require('http');
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv').config();
const { spawn }     = require('child_process');
var mongoose        = require('mongoose');
// Get our API routes
const api = require('./server/routes/api');
const app = express();

//SESSION
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);

// Exec ng build command on server start
const build = spawn('ng', ['build', '--watch']);

var mongooseOptions = {
  "server": {
    "socketOptions": {
      "autoReconnect": 1,
      "keepAlive": 1000,
      "connectTimeoutMS": 30000
    }
  },
};

mongoose.connect('mongodb://localhost/ng-meal', mongooseOptions);

app.use(session({
    secret: 'NG meal',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      db: 'ng-meal',
      url: 'mongodb://localhost/ng-meal',
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

process.on('SIGINT', () => {
  build.kill('SIGINT');
  process.exit();
});
