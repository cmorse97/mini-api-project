import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const { id, title, is_completed } = todo;

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(id, newTitle);
    setNewTitle('');
    setEditing(false);
  };

  const editingTemplate = (
    <form className="small-stack" onSubmit={handleSubmit}>
      <div className="todo-form-group">
        <label className="todo-title" htmlFor={id}>
          New name for {title}
        </label>
        <input
          id={id}
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
          <span className="visually-hidden">renaming {title}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {title}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="small-stack">
      <div className="form-group">
        <input
          id={id}
          type="checkbox"
          className="todo-checkbox"
          defaultChecked={is_completed}
          onChange={() => onToggle(id, !is_completed)}
        />
        <label className="todo-title" htmlFor={id}>
          {title}
        </label>
      </div>
      <div className="todo-controls">
        <button
          type="button"
          className="edit-btn"
          onClick={() => setEditing(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span className="visually-hidden">{title}</span>
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />{' '}
          <span className="visually-hidden">{title}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo-item">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}
