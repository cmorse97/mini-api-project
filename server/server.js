import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import errorHandler from './middleware/errorMiddleware.js';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Index route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the server!' });
});

// Todo Routes
app.use('/api/todos', todoRoutes);

// User Routes
app.use('/api/users', userRoutes);

// {*splat} is a catch all (use for error handling)
app.get('/{*splat}', (req, res) => {
  res.json({ message: 'Page not found.' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
