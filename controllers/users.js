const User= require("../models/user");

module.exports.signUp=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postSignup=(async (req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser = await User.register(newUser,password);
    //console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welecome to GlobeFlicker");
        res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
})

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to GlobeFlicker");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Come again");
        res.redirect("/listings");
    })
};