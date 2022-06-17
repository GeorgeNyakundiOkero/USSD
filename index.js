require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const admin_Route = require('./admin/index');
const users_Route = require('./users/user');
const ussd_Route = require('./ussd');


//initialize the application
const app = express();

//global variables
const DB = process.env.DB;
const PORT = process.env.PORT;

//passport middleware
require('./handlers/passport.js')(passport);

//set up static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


//views engine set up
app.set('view engine', 'ejs');

//layout set up
app.use(expressLayouts);

//handle data from forms
app.use(express.urlencoded({extended: false}));

//connect to mongoDB 
mongoose.connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
   if(err) throw err;
   console.log('Connected to database successfully'); 
});

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  //passport middleware
 app.use(passport.initialize());
 app.use(passport.session());

  //connect flash
  app.use(flash());

  //setting up a global variables to be accessed later from anywhere
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//creating a golbal user object for access from anywhere
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


//home route
app.get('/', (req, res) => {
    res.render('index');
});

//other routes
app.use('/admin', admin_Route);
app.use('/users', users_Route);
app.use('/', ussd_Route );

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`server started on port: ${PORT}`);
});