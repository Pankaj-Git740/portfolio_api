const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    imgUrl: {type:String, required: true},
    title:  {type:String, required: true},
    description:  {type:String, required: true}
});

module.exports = mongoose.model("Skill", skillSchema); 