import User from "../Models/user.model.js";

export const signUp = async (req, res) => {
  const user = req.body;

  if (!user.clerk_id || !user.email || !user.fullName || !user.role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ clerk_id: user.clerk_id });
    if (existingUser) {
      return res
        .status(200)
        .json({
          success: true,
          message: "User already registered",
          existingUser,
        });
    }

    const newUser = new User(user);
    await newUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "User successfully registered!",
        newUser,
      });
  } catch (error) {
    console.error("Error in saving user data: ", error.message);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};