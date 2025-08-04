const Experience = require("../Models/Experinece/experinece");

exports.createExperience = async (req, res) => {
  try {
    const { jobTitle, company, location, startDate, endDate, description } = req.body;

    const experience = new Experience({
      jobTitle,
      company,
      location,
      startDate,
      endDate,
      description
    });

    const savedExperience = await experience.save();
    res.status(201).json({ success: true, data: savedExperience });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating experience", error });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, data: experiences });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching experiences", error });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Experience deleted" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting experience", error });
  }
};
