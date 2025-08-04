const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Developer",
  },
  location: {
    type: String,
    default: "Unknown",
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "", 
  },
 
  
}, { timestamps: true });

module.exports = mongoose.model("Home", homeSchema);
