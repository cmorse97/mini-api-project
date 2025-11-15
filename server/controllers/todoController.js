import supabase from '../db/supabaseClient.js';
import NotFound from '../errors/NotFound.js';

async function getTodos(req, res) {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('is_completed', { ascending: true })
    .order('id', { ascending: false });

  if (error) {
    throw new NotFound(error.message);
  }

  return res.status(200).json(todos);
}

async function getTodoById(req, res) {
  const todoId = req.params.id;

  // fetch single todo from supabase based on id
  const { data: todo, error } = await supabase
    .from('todos')
    .select()
    .eq('id', todoId);

  if (error) {
    throw new NotFound(error.message);
  }

  return res.status(200).json(todo);
}

async function createTodo(req, res) {
  const newTodo = req.body;

  // insert new todo to supabase
  const { error: insertError } = await supabase.from('todos').insert(newTodo);

  if (insertError) {
    throw new NotFound(insertError.message);
  }

  return res.status(201).json(newTodo);
}

async function editTodoById(req, res) {
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
    throw new NotFound(updateError.message);
  }

  return res.status(200).json(todo);
}

async function deleteTodoById(req, res) {
  const todoId = req.params.id;

  const { data: todo, error: delError } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId);

  if (delError) {
    throw new NotFound(delError.message);
  }

  return res.status(200).json(todo);
}

export { createTodo, deleteTodoById, editTodoById, getTodoById, getTodos };
