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

router.get("/protected", function(req,res){
    if (req.user) {
        res.render('/protected');
    } else {
        res.render('home/login');
    }
});

module.exports = router;