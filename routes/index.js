const express = require('express');
const router = express.Router();

//INDEX ROUTES

//Home

// router.get('*', function(req, res){
//     res.render('404', {title: '404 error'})
// });



router.get('/', (req, res)=>{
    res.render('index', {title: 'Home | '});
});

router.get('/home', (req, res)=>{
    res.render('index', {title: 'Home | '});
});

router.get('/contact', (req, res)=>{
    res.render('contact', {title: 'Contact | '});
});

router.get('/howitworks', (req, res)=>{
    res.render('how_it_works', {title: 'How It Works | '});
});

router.get('/Affilates', (req, res)=>{
    res.render('affilates', {title: 'Affilates | '});
});

router.get('/Payouts', (req, res)=>{
    res.render('payouts', {title: 'Payouts | '});
});

router.get('/About', (req, res)=>{
    res.render('about', {title: 'About | '});
});

module.exports = router;