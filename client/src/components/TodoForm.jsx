import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todos/todoSlice';

export default function TodoForm() {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setTitle(inputValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(createTodo({ title }));
    setTitle('');
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            className="todo-input"
            name="todoTitle"
            id="todoTitle"
            value={title}
            onChange={handleChange}
            type="text"
            placeholder="Add a new todo..."
          />
        </div>
        <div className="form-group">
          <button className="form-btn" type="submit">
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
