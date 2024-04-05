import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//logging in
/**
 * This login function takes email and password from a request, validates them against the database, and sends a JWT token with user information upon successful login. 
 * It also handles errors by returning appropriate status codes and messages.
 * 
 * @date 27/03/2024 - 00:25:37
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
export const login = async (req, res) => {
  console.log('hi')
  try {
    const { email, password } = req.body;
    //find the email in mongoose
    const userStoredInDB = await User.findOne({ email: email });
    //400 status: client-side error
    if (!userStoredInDB) return res.status(400).json({ error: 'User does not exist. ' });

    //check password hash with password hash saved in database
    const passwordMatch = await bcrypt.compare(password, userStoredInDB.password);
    //400 status: client-side error
    if (!passwordMatch) return res.status(400).json({ error: 'Invalid credentials. ' });

    //issue jwt token
    const authToken = jwt.sign({ id: userStoredInDB.id }, process.env.JWT_SECRET);
    //remove password before forwarding to the frontEnd
    delete userStoredInDB.password;
    //200 status: successful request
    res.status(200).json({ authToken, userStoredInDB });

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};

//registering a user
/**
 * This registration function accepts user information from a request body. It hashes the password, creates a new user object with the hashed password, and saves it to the database using Mongoose.
 * Upon successful registration, it returns the newly created user with a 201 status code. In case of errors, it returns a 500 status code with the error message.
 * 
 * @date 27/03/2024 - 00:25:37
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const register = async (req, res) => {
  try {
    //get user attributes
    const { firstName, lastName, email, password, picturePath, bio } =
      req.body;

    //generate salt for hashing
    const salt = await bcrypt.genSalt();
    //hashing of password
    const passwordHash = await bcrypt.hash(password, salt);
    //store hash of password

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends: [],
      bio,
    });

    //save user to mongooseDB
    const savedUser = await newUser.save();
    //201 status: successful creation
    res.status(201).json(savedUser);

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};


