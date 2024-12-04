

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cssfile/register.css'
import Swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if the user already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email or username already exists
    if (existingUsers.some(user => user.email === email || user.username === username)) {
      setError('User with this email or username already exists');
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'User with this email or username already exists.',
      });
      return;
    }

    // Create a new user object
    const newUser = { username, email, password };

    // Save the new user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You can now log in with your credentials.',
    }).then(() => {
      // Navigate to the login page after user closes the SweetAlert
      navigate('/');
    });
  };

  return (
    <div className="page-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
