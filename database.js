const mongoose = require("mongoose");

async function connectToMongoDB(url){
    return mongoose.connect(url).then((succ)=>{
        console.log("Database connected !");
    }).catch((err)=>{
        console.log(err);
    })
};


module.exports = connectToMongoDB;