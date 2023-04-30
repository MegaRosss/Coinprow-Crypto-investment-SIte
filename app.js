const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const flash = require('connect-flash')
const passport = require('passport');
const User = require('./models/user');
const bodyParser = require('body-parser');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()
const MONOGO_URL = process.env.MONOGO_URL
// const uri = MONOGO_URL
mongoose.connect(MONOGO_URL ,{ useNewUrlParser: true , useCreateIndex: true });

//requiring routes
const indexRoutes = require('./routes/index');
const userWorksRoutes = require('./routes/usersWork');
const authRoutes = require('./routes/auth')

const app = express();

// app.get('*', function(req, res){
//     res.render('404');
// });

//APP SETUP

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'mannyislordraziel',
    resave: false,
    saveUninitialized: false
}));

//FLASH SETUP
app.use(flash());

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.use(authRoutes);
app.use(indexRoutes);
app.use(userWorksRoutes);

app.get('dashboard/*', (req, res)=>{
    res.render('dashboard404', {title: 'Dash 404 Page not found | '})
});
app.get('*', (req, res)=>{
    res.render('404', {title: '404 Page not found | '})
});

const isLoggedIn=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    };
    req.flash('error', 'Please Login First')
    res.redirect('/login');
};

const PORT = process.env.PORT || 3500
app.listen(PORT, ()=>{
    console.log(`Server has started on ${PORT}`)
});



