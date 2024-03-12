import User from "../model/User"; // Importing the User model
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing

// Controller to get all users
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find(); // Finding all users
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users }); // Returning all users
};

// Controller for user signup
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body; // Getting user data from request body
  let existingUser;
  try {
    existingUser = await User.findOne({ email }); // Checking if user already exists
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password); // Hashing the password

  const user = new User({
    name,
    email,
    password: hashedPassword, // Creating a new user with hashed password
    blogs: [],
  });

  try {
    await user.save(); // Saving the new user to the database
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user }); // Returning the newly created user
};

// Controller for user login
export const login = async (req, res, next) => {
  const { email, password } = req.body; // Getting email and password from request
  let existingUser;
  try {
    existingUser = await User.findOne({ email }); // Finding user by email
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Couldnt Find User By This Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // Comparing passwords
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser }); // Successful login
};
