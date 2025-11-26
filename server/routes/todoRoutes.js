import express from 'express';
import {
  createTodo,
  deleteTodoById,
  editTodoById,
  getTodoById,
  getTodos,
} from '../controllers/todoController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, createTodo);

router
  .route('/:id')
  .get(protect, getTodoById)
  .delete(protect, deleteTodoById)
  .put(protect, editTodoById);

export default router;
