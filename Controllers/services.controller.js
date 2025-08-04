const Services = require("../Models/Service/services");
const cloudinary = require("../Utils/cloudinary");

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "services",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const service = new Services({
      imgUrl: result.secure_url,
      title,
      description,
    });

    const saved = await service.save();
    res.status(201).json({ success: true, data: saved });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create service", error });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch services", error });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Services.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete service", error });
  }
};
