import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setTitle(inputValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      onAdd(title);
      setTitle('');
    } catch (error) {
      console.error('Error creating todo: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        name="todoTitle"
        id="todoTitle"
        value={title}
        onChange={handleChange}
        type="text"
        placeholder="Add a new todo..."
      />
      <button className="submit-btn" type="submit">
        Add
      </button>
    </form>
  );
}
