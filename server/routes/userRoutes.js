import express from 'express';
import {
  fetchAllUsers,
  fetchUser,
  loginUser,
  registerUser,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:username', protect, fetchUser);
router.get('/', fetchAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
