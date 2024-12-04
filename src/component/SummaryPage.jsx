
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './cssfile/summary.css'

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCar, startDate, endDate, rentalDays, totalPrice } = location.state;

  const handleConfirm = () => {
    // Save the booking to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookingList')) || [];
    const newBooking = {
      car: selectedCar,
      startDate,
      endDate,
      rentalDays,
      totalPrice,
    };
    savedBookings.push(newBooking);
    localStorage.setItem('bookingList', JSON.stringify(savedBookings));

    // Navigate back to the booking page
    navigate('/booking');
  };

  const handleBackToBooking = () => {
    // Navigate back to the booking page without confirming the booking
    navigate('/booking');
  };

  return (
    <div className="summary-container">
      <h2>Booking Summary</h2>
      <div className="summary-details">
        <p><strong>Car Model:</strong> {selectedCar.brand} {selectedCar.color}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Total Rental Days:</strong> {rentalDays} days</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>

      <button onClick={handleConfirm}>Confirm Booking</button>
      <button onClick={handleBackToBooking}>Back to Booking</button>
    </div>
  );
};

export default SummaryPage;
