import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner.jsx';
import { login, reset } from '../features/auth/authSlice.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form-heading">
        <h1>
          <FontAwesomeIcon icon={faArrowAltCircleRight} /> Login
        </h1>
        <p>Please login to your account</p>
      </section>
      <section>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
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
        </div>
        <div className="form-cta">
          <p>
            Don't have an account?{' '}
            <span className="form-cta">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
