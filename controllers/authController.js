const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

// register user
module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // check if all fields are filled
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields...' });
  }

  // check if password is atleast 6 characters
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password should be atleast 6 characters long...' });
  }

  try {
    const userEmail = await User.findOne({ where: { email } });

    if (userEmail) {
      return res
        .status(400)
        .json({ message: 'Email with this email already exists...' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // remove password from response for security
    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// login user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields...' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
      }
    );

    // remove password from response for security
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get profile info
exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
