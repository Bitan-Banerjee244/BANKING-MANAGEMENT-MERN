import User from "../models/userAccount.models.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userID = req.userId; 

    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userID).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get Current User Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


import { uploadImage } from "../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    // Upload new image if provided
    let photoUrl;
    if (req.file) {
      const uploaded = await uploadImage(req.file.path);
      if (!uploaded) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      photoUrl = uploaded;
    }

    // Allowed fields
    const allowedUpdates = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      address: req.body.address,
      gender: req.body.gender,
    };

    // Add image if updated
    if (photoUrl) allowedUpdates.photoUrl = photoUrl;

    //  Perform update
    const updatedUser = await User.findByIdAndUpdate(userId, allowedUpdates, {
      new: true,
      runValidators: true,
    }).select("-pin");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error.message);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
