const express=require("express");
const router= express.Router();
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { default: next } = require("next");
const { saveRedirectUrl } = require("../middleware");

const userController=require("../controllers/users")

router.get("/signup",userController.signUp);

router.post("/signup",wrapAsync(userController.postSignup));

router.get("/login",userController.renderLoginForm);

router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash:true,
    }),userController.login);

router.get("/logout",userController.logout);

module.exports=router;