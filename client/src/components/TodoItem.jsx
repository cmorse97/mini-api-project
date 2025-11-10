import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(todo.id, newTitle);
    setNewTitle('');
    setEditing(false);
  };

  const editingTemplate = (
    <form className="small-stack" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-title" htmlFor={todo.id}>
          New name for {todo.title}
        </label>
        <input
          id={todo.id}
          className="todo-text"
          type="text"
          value={newTitle}
          onChange={handleChange}
        />
      </div>
      <div className="todo-controls">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {todo.title}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {todo.title}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="small-stack">
      <div className="form-group">
        <input
          id={todo.id}
          type="checkbox"
          className="todo-checkbox"
          defaultChecked={todo.is_completed}
          onChange={() => onToggle(todo.id, !todo.is_completed)}
        />
        <label className="todo-title" htmlFor={todo.id}>
          {todo.title}
        </label>
      </div>
      <div className="todo-controls">
        <button
          type="button"
          className="edit-btn"
          onClick={() => setEditing(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span className="visually-hidden">{todo.title}</span>
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />{' '}
          <span className="visually-hidden">{todo.title}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo-item">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}
