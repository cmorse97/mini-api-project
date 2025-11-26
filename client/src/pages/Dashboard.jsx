import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { getTodos, reset } from '../features/todos/todoSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Todo List Dashboard</p>
      </section>

      <div className="todo-form-container">
        <TodoForm />
      </div>

      <section className="content">
        {todos.length > 0 ? (
          <div className="todos">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <h3>You have no todos yet!</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
