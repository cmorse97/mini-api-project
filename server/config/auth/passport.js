import bcrypt from 'bcryptjs';
import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import supabase from '../db/supabaseClient.js';

const verifyCallback = async (username, password, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select()
      .eq('username', username);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    console.error(error.message);
    return done(error);
  }
};

const strategy = new LocalStrategy(username, password, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select()
      .eq('id', id);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    console.error(error.message);
    return done(error);
  }
});
