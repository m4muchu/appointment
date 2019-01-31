const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// routes
const slot = require('./routes/api/slot');
const users = require('./routes/api/users');

const app = express();
const port = 5000;

//body parser middleware
// it make to able to access req.body

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require('./config/key').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to mlba');
  });

app.get('/', (req, res) => {
  res.send('server is running');
});

// passport middleware

app.use(passport.initialize());

// passport configration
require('./config/passport')(passport);
// api routes
app.use('/api/slot', slot);
app.use('/api/users', users);

app.listen(port, () => console.log('server is running'));
