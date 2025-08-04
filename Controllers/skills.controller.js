const Skill = require("../Models/Skill/skills");
const cloudinary = require("../Utils/cloudinary");

// Create Skill
exports.createSkill = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imgUrl = "";

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "skills"
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    imgUrl = result.secure_url;

    const skill = new Skill({ imgUrl, title, description });
    const savedSkill = await skill.save();

    res.status(201).json({ success: true, data: savedSkill });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating skill", error });
  }
};

// Get All Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching skills", error });
  }
};
