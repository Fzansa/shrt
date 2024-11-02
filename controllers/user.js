const User = require("../models/user");
const {v4 : uuidv4} = require("uuid");
const {setUser} = require("../service/auth");

async function handleUserSignup(req, res){
    const {Name,Email,Password} = req.body;

    await User.insertMany({
        Name, Email, Password 
    });
    return res.redirect("/login");
};

async function handleUserLogin(req, res){
    const {Email,Password} = req.body;

    const user = await User.findOne({
         Email, Password 
    });
    if(!user) return res.render("login",{
        error:"Invalid Username or Password"
    })


    const token = setUser(user);
    res.cookie('uuid', token);
    return res.redirect("/");
};

module.exports = {handleUserSignup, handleUserLogin};