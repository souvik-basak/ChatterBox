import User from "../model/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // { _id: { $ne: loggedInUser } } this will exclude the logged in user from the list
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
