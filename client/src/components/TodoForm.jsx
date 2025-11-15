import { useFormStatus } from 'react-dom';

export default function TodoForm({ onAdd }) {
  const { pending } = useFormStatus();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputValue = formData.get('todoTitle');

    onAdd(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        name="todoTitle"
        id="todoTitle"
        type="text"
        placeholder="Add a new todo..."
      />
      <button className="submit-btn" type="submit" disabled={pending}>
        {pending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
