import asyncHandler from 'express-async-handler';
import supabase from '../config/db/supabaseClient.js';

// @desc --- Get todos
// @route -- GET /api/todos
// @access - Private
const getTodos = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) {
    res.status(401);
    throw new Error('User not found');
  }

  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('is_completed', { ascending: true })
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return res.status(200).json(todos);
});

const getTodoById = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.id;

  if (!userId) {
    res.status(401);
    throw new Error('User not found');
  }

  // fetch single todo from supabase based on id
  const { data: todo, error } = await supabase
    .from('todos')
    .select()
    .eq('user_id', userId)
    .eq('id', todoId);

  if (error) {
    throw new Error(error.message);
  }

  return res.status(200).json(todo);
});

// @desc --- Create a todo
// @route -- POST /api/todos
// @access - Private
const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { id: userId } = req.user;

  if (!userId) {
    res.status(401);
    throw new Error('User not found');
  }

  if (!title) {
    res.status(400);
    throw new Error('Please include a title');
  }
  const newTodo = {
    title: title,
    user_id: userId,
  };

  // insert new todo to supabase
  const { error: insertError } = await supabase.from('todos').insert(newTodo);

  if (insertError) {
    throw new NotFound(insertError.message);
  }

  return res.status(201).json(newTodo);
});

// @desc --- Edit existing todo by ID
// @route -- PUT /api/todos/:id
// @access - Private
const editTodoById = asyncHandler(async (req, res) => {
  const { title, is_completed } = req.body;
  const todoId = req.params.id;
  const userId = req.user.id;

  // Check for authorized user
  if (!userId) {
    res.status(401);
    throw new Error('User not found');
  }

  const { data: todo, error: updateError } = await supabase
    .from('todos')
    .update({
      ...(title && { title }), // optional update
      ...(typeof is_completed === 'boolean' && { is_completed }), // ensure boolean
    })
    .eq('id', todoId)
    .eq('user_id', userId)
    .select('*');

  if (todo.user_id !== userId) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (updateError) {
    throw new Error(updateError.message);
  }

  return res.status(200).json(todo);
});

// @desc --- Delete a todo by ID
// @route -- DEL /api/todos/:id
// @access - Private
const deleteTodoById = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.id;

  // Check for authorized user
  if (!userId) {
    res.status(401);
    throw new Error('User not found');
  }

  const { data: todo, error: delError } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)
    .eq('user_id', userId);

  if (delError) {
    throw new Error(delError.message);
  }

  return res.status(200).json(todo);
});

export { createTodo, deleteTodoById, editTodoById, getTodoById, getTodos };
