import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const handleAdd = async (title) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    await fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    await fetchTodos();
  };

  const handleToggle = async (id, is_completed) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_completed }),
    });

    await fetchTodos();
  };

  const handleEdit = async (id, title) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    await fetchTodos();
  };

  return (
    <>
      <div className="todo-list">
        <TodoForm onAdd={handleAdd} />

        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No todos yet!</p>
        )}
      </div>
    </>
  );
}
