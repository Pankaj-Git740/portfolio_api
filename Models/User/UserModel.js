const {Schema, model, Types} = require("mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        require: true
    },
    password :{
        type:String,
        require:true
    },
   
});

const UserModel = model("User", userSchema);
module.exports = UserModel