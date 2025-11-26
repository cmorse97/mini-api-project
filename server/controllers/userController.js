import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import supabase from '../config/db/supabaseClient.js';

// @desc --- Get user data
// @route -- GET /api/users/:user
// @access - Private
const fetchUser = asyncHandler(async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, email')
    .eq('id', req.user.id)
    .single();

  if (error) {
    res.status(400);
    throw new Error('Failed to fetch user data');
  }

  res.status(200).json(user);
});

// @desc --- Fetch list of all users
// @route -- GET /api/users/
// @access - Public
const fetchAllUsers = asyncHandler(async (req, res) => {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, username');

  if (error) {
    res.status(400);
    throw new Error('Failed to fetch users from database');
  }

  res.status(200).json(users);
});

// @desc --- Register new user
// @route -- POST /api/users/register
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  const { data: registeredUser, error } = await supabase
    .from('users')
    .insert(user)
    .select('id, username, email')
    .single();

  if (error) {
    res.status(400);
    throw new Error('User already exists');
  }

  res.status(201).json({
    _id: registeredUser.id,
    username: registeredUser.username,
    email: registeredUser.email,
    token: generateToken(registeredUser.id),
  });
});

// @desc --- Authenticate a user
// @route -- POST /api/users/login
// @access - Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Compare password provided to database to authenticate
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Generate JWT
const generateToken = (id) => {
  console.log('Payload id: ', id);
  const payload = { id: id };
  return jwt.sign(payload, process.env.SUPABASE_JWT_SECRET, {
    expiresIn: '30d',
  });
};

export { fetchAllUsers, fetchUser, loginUser, registerUser };
