const express = require('express');
const app = express();
const router = express.Router();
const addFund = require('../models/addFunds');
const passport = require('passport');
const User = require('../models/user');
const methodOverride = require('method-override');
const flash = require('connect-flash');

router.use(methodOverride('_method'));

router.get('/dashboard', isLoggedIn, function(req, res){
    if(req.user.username === 'admin'){
        addFund.find({}, function(err, data){
            if(err){
                console.log(err);
            } else {
                res.render('adminDashboard', {title: 'Transactions | ', fund: data})
            }
        }).maxTimeMS(30000)
    } else {
        res.render('dashboard', {title: 'Dashboard | '})
    }
});

router.get('/dashboard/adminOperation/:id', isLoggedIn, function(req, res){
    if(req.user.username === 'admin'){
        addFund.findById(req.params.id, (err, foundFund)=>{
            if(err){
                res.render('adminDashboard')
            }else {
                res.render('showFundAdmin', { title: 'showFund | ', fund: foundFund})
            }
        })
    } else {
        res.render('dashboard', {title: 'Dashboard | '})
    }
});

router.put('/dashboard/adminOperation/:id', isLoggedIn, function(req, res){
        if(req.user.username === 'admin'){
            let status = 'sucess'
            
             
            
            

                addFund.findByIdAndUpdate(req.params.id, { status: status} , function(err, data){
                    if(err){
                        res.send(err)
                    }else {
                        // res.send('hello');
                        
                            // foundFund.status = req.body.status;
                           
                            res.render('showFundAdmin', {fund: data , title: 'showFund ||'})
                            
                    
                        // res.render('showFundAdmin', { title: 'showFund |'})
                    }
                })
            } 
        else {
                res.render('dashboard', {title: 'Dashboard | '})
            }
})

router.get('/dashboard/addfunds', isLoggedIn, function(req, res){
    res.render('addFunds', {title: 'Add funds | '})
});

router.get('/dashboard/profile', isLoggedIn, function(req, res){
    res.render('profile', {title: 'Profile | '})
});

router.get('/dashboard/yourdeposits', isLoggedIn, function(req, res){
    res.render('yourdeposits', {title: 'Your Deosits | '})
});

router.get('/dashboard/settings', isLoggedIn, function(req, res){
    res.render('settings', {title: 'Setting | '})
});

router.get('/dashboard/operationhistory', isLoggedIn, function(req, res){
    addFund.find({}, function(err, data){
        if(err){
            console.log(err);
        } else{
            let showTransactions = []
            console.log('start')
            data.forEach(function(d){
                let authId = d.author.id
                let reqId =  req.user.id
                // d.author.id == req.user._id
                if((reqId) == authId){
                    showTransactions.push(d)
                }
            })
            // data.forEach(function(d){
            //     if(d.author.id = req.user.id){
            //         console.log(d)
            //     }
            // })
            res.render('operationHistory', {title: 'Operation History | ', fund: showTransactions})
            // console.log(showTransactions)
            console.log(req.user.id)
        }
    })
    
});

addFund.find({}, function(err, data){
    if(err) {
        console.log(err);
    } else {
        console.log(data)
    }
})


let operationAdd = "Add Fund";

router.post('/dashboard/addfunds', isLoggedIn, function(req, res){
    // console.log(req.body.crypto);
    // console.log(req.body.amount);
    // console.log(req.user);
    var crypto = req.body.crypto
    console.log(crypto)
    if (crypto == 'Btc'){
        var coinName = "Bitcoin";
        console.log('bitcoin is it');
        
    } else if (crypto == 'Usdc'){
        var coinName = "Usd Coin";
        console.log('usdc is it');
        
    } else if (crypto == 'Busd'){
        var coinName = "Binance USD";
        console.log('busd is it')
    } else if (crypto == 'Usdt'){
        var coinName = "Tether";
        console.log('usdt is it')
    }
    var operation = operationAdd
    var amount = req.body.amount
    var status = 'pending'
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newFund = {crypto: crypto, operation: operationAdd, coinName: coinName, status: status ,amount: amount, author: author}
    addFund.create(newFund, function(err, newFund){
        if(err){
            console.log(err);
            return res.redirect('/dashboard/addfunds', {title: 'Add funds | '});
        } else if (req.body.crypto === 'Btc'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/btc')
        } else if (req.body.crypto === 'Usdt'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/usdt')
        }  else if (req.body.crypto === 'Busd'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/busd')
        }else if (req.body.crypto === 'Usdc'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/usdc')
        }
    }); 
    console.log(newFund)
});



router.get('/dashboard/operation/:id', isLoggedIn, function(req, res){
    addFund.findById(req.params.id, function(err, foundFund){
        if(err){
            res.redirect('../../dashboard/operationhistory')
        }else {
            res.render('showFund', {fund: foundFund, title: 'showFund'})
        }
    })
})

router.delete('/dashboard/operation/:id', isLoggedIn, function(req, res){
    res.send('you have reached the delete route')
})

router.get('/dashboard/addfunds/btc', isLoggedIn, function(req, res){
    res.render('btcFunds', {title: 'Add Funds | '})
});

router.get('/dashboard/addfunds/usdt', isLoggedIn, function(req, res){
    res.render('usdtFunds', {title: 'Add Funds | '})
});

router.get('/dashboard/addfunds/busd', isLoggedIn, function(req, res){
    res.render('busdFunds', {title: 'Add Funds | '})
});

router.get('/dashboard/addfunds/usdc', isLoggedIn, function(req, res){
    res.render('usdcFunds', {title: 'Add Funds | '})
});

// router.get('/dashboard/paymentdetails/:id', isLoggedIn, function(req, res){
//     res.render('paymentDetails', {title: 'Payment Details | '})
// });

//EDIT USER PAYMENT DETAILS
router.get('/dashboard/paymentdetails/:id', isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err){
            res.redirect('../../dashboard')
        } else {
            res.render('paymentDetails', {title: 'Payment Details | ', user: foundUser});
        }
    })
    
});

router.get('/dashboard/paymentdetails/:id/edit', isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            res.redirect('../../dashboard')
        } else{
            res.render('editPaymentDetails', {title: 'Edit Payment Details | ', user: foundUser})
        }
    })
})

//UPDATE USER PAYMENTS DETAILS
router.put('/dashboard/paymentdetails/:id', isLoggedIn, function(req, res){
    let data = {
        usdtAdd : req.body.usdt,
        busdAdd : req.body.busd,
        usdcAdd : req.body.usdc
    }
    User.findByIdAndUpdate(req.params.id, data, function(err, updatedUser){
        if(err){
            res.send('error')
        } else {
            console.log(updatedUser)
            res.redirect('/dashboard/pa/dashboard/adminOperation/61e53cb54f1f7d0ad79f6c71ymentdetails/' + req.params.id)
        }
    })
});

//ADD FUNDS TO WALLET
// router.put('/dashboard/adminOperation/:id', isLoggedIn, function(req, res){
//    
// });


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    req.flash('error', 'Please Login First');
    res.redirect('/login');
};

module.exports = router;
