var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.render("home/index");
});

router.get("/login", function(req, res){
    res.render("home/login");
});

router.get("/about", function(req, res){
    res.render("home/about");
});

router.get("/signup", function(req, res){
    res.render("home/signup");
});

//If the user is logged in loads the protected page, otherwise prompts user to log in
router.get("/protected", function(req,res){
    if (req.user) {
        res.render('home/protected');
    } else {
        res.render('home/login');
    }
});

//Logs the user out by deleting their authentication token
router.get('/logout', function(req, res) {
    try {
        delete authTokens[req.cookies.AuthToken];
    }    
    catch(err){}
    res.render('home/index');
});

module.exports = router;