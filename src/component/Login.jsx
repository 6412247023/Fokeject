
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cssfile/login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered username and password match any user in localStorage
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Store user data
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Navigate to the booking page
      navigate('/booking');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
    
      <h2>Welcome to Carbook</h2>
    
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
