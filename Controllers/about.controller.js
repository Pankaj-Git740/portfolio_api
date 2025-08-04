const About = require("../Models/About/about");

exports.createOrUpdateAbout = async (req, res) => {
  try {
    const { description } = req.body;

    let about = await About.findOne();

    if (about) {
      about.description = description;
      await about.save();
    } else {
      about = await About.create({ description });
    }

    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ success: false, message: "About info not found" });
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
