const Project = require("../Models/Projects/project");
const cloudinary = require("../Utils/cloudinary");

exports.createProject = async (req, res) => {
  try {
    const { title, timePeriod, descriptions, techUsed } = req.body;

    let imageUrls = [];

    // Upload each image file to Cloudinary
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "projects" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          ).end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }

    const newProject = new Project({
      title,
      timePeriod,
      descriptions,
      techUsed: JSON.parse(techUsed), 
      imageUrls,
    });

    const saved = await newProject.save();
    res.status(201).json({ success: true, data: saved });

  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({ success: false, message: "Failed to create project", error });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get projects", error });
  }
};
