const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  isCompleted: { type: Boolean, default: false }, 
  title: { type: String, required: true },        
  timePeriod: { type: String, required: true },
  imageUrls: { type: [String], required: true },  
  descriptions: { type: String, required: true },
  techUsed: { type: [String], default: [] }      
});

module.exports = mongoose.model("Project", projectSchema);
