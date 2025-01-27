let middlewareObj = {};

middlewareObj.isLoggedin =  (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    };
    req.flash('error', 'Please Login First');
    res.redirect('/login');
};


module.exports = middlewareObj