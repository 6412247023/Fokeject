import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import Register from './component/Register';
import Booking from './component/Booking';
import SummaryPage from './component/SummaryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/summary' element={<SummaryPage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
       
      </Routes>
    </Router>
  );
}

export default App;

