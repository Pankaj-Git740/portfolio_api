const Home = require("../Models/Home/home");
const cloudinary = require("../Utils/cloudinary");

exports.createOrUpdateHome = async (req, res) => {
  try {
    const { name, role, location, description } = req.body;
    let imageUrl = "";

    // If image file exists, upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "home_profiles",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    let homeData = await Home.findOne();

    if (homeData) {
      homeData.name = name;
      homeData.role = role;
      homeData.location = location;
      homeData.description = description;
      if (imageUrl) homeData.imageUrl = imageUrl;
      await homeData.save();
    } else {
      homeData = await Home.create({ name, role, location, description, imageUrl });
    }

    res.status(200).json({ success: true, data: homeData });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading or saving", error });
  }
};

exports.getHome = async (req, res) => {
  try {
    const homeData = await Home.findOne();
    if (!homeData) {
      return res.status(404).json({ success: false, message: "No Home data found" });
    }
    res.status(200).json({ success: true, data: homeData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data", error });
  }
};
