import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner.jsx';
import { register, reset } from '../features/auth/authSlice.js';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputKey = event.target.name;
    setFormData({
      ...formData,
      [inputKey]: inputValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form-heading">
        <h1>
          <FontAwesomeIcon icon={faUser} /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder="johndoe"
              type="text"
              value={username}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="email@example.com"
              type="email"
              value={email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Please enter a password..."
              type="password"
              value={password}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <div className="form-cta">
          <p>
            Already have an account?{' '}
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
