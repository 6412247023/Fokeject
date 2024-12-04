import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
      // If no logged-in user found, redirect to login page
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to Carbook</h2>
      {user ? (
        <p>Welcome</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
