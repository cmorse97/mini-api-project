import { useEffect, useState } from 'react';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodoStatus,
  updateTodoTitle,
} from '../utils/handleTodoData';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    loadData();
  }, []);

  const handleAdd = async (title) => {
    await addTodo(title);
    const refreshed = await fetchTodos();
    setTodos(refreshed);
  };

  const handleToggle = async (id, isComplete) => {
    await updateTodoStatus(id, isComplete);
    const refreshed = await fetchTodos();
    setTodos(refreshed);
  };

  const handleEdit = async (id, newTitle) => {
    await updateTodoTitle(id, newTitle);
    const refreshed = await fetchTodos();
    setTodos(refreshed);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    const refreshed = await fetchTodos();
    setTodos(refreshed);
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
