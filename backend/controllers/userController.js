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

