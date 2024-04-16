import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../src/UserContext'; // Adjust the import path as needed
import Back from "../components/common/back/Back";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      setUser(response.data); // Set user data in context
      localStorage.setItem('user', JSON.stringify(response.data)); // Also set user data in localStorage
      navigateToDashboard(response.data.role);
    } catch (error) {
      setErrorMessage(error.response?.data || 'Login failed. Please try again.');
    }
  };

  const navigateToDashboard = (role) => {
    switch (role) {
      case 'educator':
        navigate('/Educatordashboard');
        break;
      case 'student':
        navigate('/StudentDashboard');
        break;
      case 'superadmin':
        navigate('/SuperAdmin');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <>
      <Back title='Login' />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-2">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
