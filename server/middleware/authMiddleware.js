import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import supabase from '../config/db/supabaseClient.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      // Header format is: 'Bearer token'
      // Split header token into two strings, get the second (token)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

      console.log(decoded);

      // Get user from the token
      const { data: user, error } = await supabase
        .from('users')
        .select('id, username, email')
        .eq('id', decoded.id)
        .single();

      if (error) {
        next(error);
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protect;
