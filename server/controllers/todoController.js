import asyncHandler from 'express-async-handler';
import supabase from '../config/db/supabaseClient.js';

// @desc --- Get todos
// @route -- GET /api/todos
// @access - Private
const getTodos = asyncHandler(async (req, res) => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('is_completed', { ascending: true })
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return res.status(200).json(todos);
});

const getTodoById = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  // fetch single todo from supabase based on id
  const { data: todo, error } = await supabase
    .from('todos')
    .select()
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
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please include a title');
  }
  const newTodo = req.body;

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

  const { data: todo, error: updateError } = await supabase
    .from('todos')
    .update({
      ...(title && { title }), // optional update
      ...(typeof is_completed === 'boolean' && { is_completed }), // ensure boolean
    })
    .eq('id', todoId)
    .select();

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

  const { data: todo, error: delError } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId);

  if (delError) {
    throw new Error(delError.message);
  }

  return res.status(200).json(todo);
});

export { createTodo, deleteTodoById, editTodoById, getTodoById, getTodos };
