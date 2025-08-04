const Education = require("../Models/Education/edu");

exports.createOrUpdateEducation = async (req, res) => {
  try {
    const { degree, institution, startYear, endYear, description } = req.body;

    const newEntry = new Education({ degree, institution, startYear, endYear, description });
    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create education entry", error });
  }
};

exports.getAllEducation = async (req, res) => {
  try {
    const educations = await Education.find().sort({ startYear: -1 });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch education entries", error });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    await Education.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete entry", error });
  }
};
