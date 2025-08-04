const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
    imgUrl: {type:String, required: true},
    title:  {type:String, required: true},
    description:  {type:String, required: true}
});

module.exports = mongoose.model("Services", servicesSchema); 