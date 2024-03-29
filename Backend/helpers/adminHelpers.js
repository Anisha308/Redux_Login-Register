import User from "../models/userModel.js";

const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, _id: 1 });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    // Attempt to delete the user by their _id
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };
    }

    // If the user was successfully deleted, return a status indicating success
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    console.error("Error deleting user:", error);

    throw error;
  }
};
export { fetchAllUsers, deleteUser };