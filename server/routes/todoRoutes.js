import express from 'express';
import {
  createTodo,
  deleteTodoById,
  editTodoById,
  getTodoById,
  getTodos,
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').get(getTodoById).delete(deleteTodoById).put(editTodoById);

export default router;
