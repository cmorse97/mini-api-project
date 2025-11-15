const BASE_URL = '/api/todos';

export const fetchTodos = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const addTodo = async (title) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error('Failed to add new todo');
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
  return true;
};

export const updateTodoTitle = async (id, title) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error('Failed to update todo title');
  return res.json();
};

export const updateTodoStatus = async (id, is_completed) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_completed }),
  });

  console.log('Data: ', is_completed);
  if (!res.ok) throw new Error('Failed to update todo status');
  return res.json();
};
