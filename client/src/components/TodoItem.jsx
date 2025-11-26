import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todos/todoSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const { id, title, created_at } = todo;

  const date = new Date(created_at).toLocaleString('en-US').split(',')[0];

  return (
    <div className="todo-item">
      <div className="checkbox">
        <input
          type="checkbox"
          name="completeTodo"
          id="completeTodo"
          className="todo-checkbox"
        />
      </div>
      <div className="todo-title">
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
      <div className="todo-controls">
        {/* @TODO - Add in edit functionality to todoServices/todoSlice */}
        <button className="edit-btn">
          <FontAwesomeIcon icon={faPenToSquare} className="fa-icon" />
        </button>
        <button onClick={() => dispatch(deleteTodo(id))} className="delete-btn">
          <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
        </button>
      </div>
    </div>
  );
}
