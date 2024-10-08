const express = require("express");
const app = express();
const session=require("express-session");

const sessionOptions= {
    secret:"mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

app.get("/register",(req,res)=>{
    let {name = "anony"}=req.query;
    req.session.name=name;
    res.redirect("/test");
})

//app.use(session({secret: "mysupersecretstring"}));

app.get("/test",(req,res)=>{
    res.send(`Request successful,${req.session.name}`);
})

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});