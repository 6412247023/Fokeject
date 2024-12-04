import React, { useState, useEffect } from 'react';
import './cssfile/booking.css';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const initialCars = [
    { id: 1, brand: 'Toyota', color: 'Red', isBooked: false, bookings: [], image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?cs=srgb&dl=pexels-mikebirdy-1335077.jpg&fm=jpg' , pricePerDay: 50 },
    { id: 2, brand: 'Honda', color: 'Blue', isBooked: false, bookings: [], image: 'data:image/jpeg;base64,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', pricePerDay: 45 },
    { id: 3, brand: 'BMW', color: 'Black', isBooked: false, bookings: [], image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFhUWFxgWGBYWFxgVFRcYFRUXFxUXFhkaHyggGBolGxUVITEiJSkrLi4uFx8zODMsNygtLi0BCgoKDg0OFg8QFS0ZFRkrNy0rNystMjctNyswLisrMzEtOCstLTg3LTItMTc3KzgtKzcrKysrNzcrKysrKzcrN//AABEIAK4BIgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xABGEAACAQIDAwkFBQYFAQkAAAABAgADEQQSITFBUQUGEyIyYXGBkQdyobHBI0JSwtEUYoKisuEzQ1OS8CQVFhdzs8Pi4/H/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAYEQEBAQEBAAAAAAAAAAAAAAAAAREhAv/aAAwDAQACEQMRAD8A7jERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBE8ZgBcmwGpJ2CaVy/wC07AYclVZq7jdSF1Hi50P8N4G7ROHcpe2zEE/ZYekg/fz1D69UfCa/i/a/yk2yqE92mn5lJgfSMT5XxHtE5Rfbiq38Lsn9Fpj63OvGN2sRWbxqufm0D64vPMw4z48qcs1ztZj4kmWP+0nJtpfw/tA+yekHEes9zDjPknBUKji5sBt2DZx10A7zJi0FG2ob92Y/IBf5oH1XE+X8OjXstWsptcWZhcXtoRV4kesuryhiBa2Jxo36Va30rQPpuJ86YbnRjqfZxmK/j6//AKjPM7yb7T8bT/xGpV1G3OppN/vAVB6GB26JqPN32g4TEkIx6Godi1CMrH9yp2W+BPCbdAREQEREBERAREQEREBERAREQEREBERAREhcscqUsNRavVayINbC5J3BRvJO6BNmsc6ue2Gwd0J6WtbSihFxwNQ7KY8deAM55y37UMViFZMOgwyEkdJmz1SvAaZUbiRe243mlUlZyQgvrdnJJ1O0s20mBmedXO7E4sHpqlkvpRp3FMcL76h728gJq9HkGrV1c5F/e2+S/rabHhOT0TXtN+I/QbpKvJrOtcxfNmilJyt2cKSC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', pricePerDay: 80 },
    { id: 4, brand: 'Mercedes', color: 'White', isBooked: false, bookings: [], image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUVGBYXEhcYFhUZFxcWFxIWFhUXFhgYHSggGh0lGxYVIjEiJSktLi4uGB8zODMtNygtLisBCgoKDQ0NDw0NDy0ZFhkrLSsrLSsrNy0rKystLSsrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQECAwj/xABHEAABAwICBwQGCAMECwEAAAABAAIDBBESIQUGEzFBUWEHInGRMlKBobHRFCMzQmJyksFDU4IVFrLhF2Vzg5Sio8LS8PEl/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC8UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEReNRUNYLuNgg9l4SVTBvPln8FXun9fS4ltNYt3YzctJv9wDNw67jwuFoamurCwySTOY0C+ZawnkAGi/mgtl2km8AT5D914yaWw57GRw/DgJ8sVz7LqlKXS9Sbu20pzAAxHeN5+A9hUgodYJoiNpM1267e7ib7Q0Nd/V5hBPBrjT3IubjeCCHDxa4AhdTrnB1UV1toRV0xqoB9fC3EMN/rI7Yi0jjlm2+4hw5qCQwVEkbZGSRuDmhw9EZEX3ltkFx/30g5H3Lu3XOnPNUKNKyet7m/Jd26Vk9Y/++xBfrNbaY/eI9g+ayY9Yac/xPMFUCdIyje93TcsiPSD94lJtv7p+NkF8HTsA3yW6lr8P6rW96y6WtjkF45Gv/K4H4KjtG1lQ/NjxfPIkA5b+HULMl0hM37Vh6O4jwkYbtPUEILtuiq7ROudTFa4+kxgZtJAnHVrzZsmXB1j+I7lPtBabgq49pBJiAye0gtex1rlsjDm12e4oNmiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiwamuAybYnieAQe9VUhguevG27eTyCqfWvWR1VdsZOxJs21xtT63PAN4HHepppijNRG6Mvc0PsHkWuW3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', pricePerDay: 100 },
  ];

  const [cars, setCars] = useState(initialCars);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars'));
    if (savedCars) {
      setCars(savedCars);
    }

    const savedBookings = JSON.parse(localStorage.getItem('bookingList'));
    if (savedBookings) {
      setBookingList(savedBookings);
    }
  }, []);

  const isBookingOverlap = (car, start, end) => {
    for (let booking of car.bookings) {
      if (
        (new Date(start) >= new Date(booking.startDate) && new Date(start) <= new Date(booking.endDate)) ||
        (new Date(end) >= new Date(booking.startDate) && new Date(end) <= new Date(booking.endDate)) ||
        (new Date(start) <= new Date(booking.startDate) && new Date(end) >= new Date(booking.endDate))
      ) {
        return true;
      }
    }
    return false;
  };

  const saveBooking = () => {
    if (!selectedCar || !startDate || !endDate) {
      setError('Please fill in all fields.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be later than start date.');
      return;
    }

    if (isBookingOverlap(selectedCar, startDate, endDate)) {
      setError('Booking overlap detected.');
      return;
    }

    const rentalDays = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = rentalDays * selectedCar.pricePerDay;

    const bookingDetails = {
      selectedCar,
      startDate,
      endDate,
      rentalDays,
      totalPrice,
    };

    // Navigate to the Summary page with booking details
    navigate('/summary', { state: bookingDetails });
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="booking-container">
      <h2>Car Rental Booking</h2>
      <div className="car-selection">
        <h3>Select a Car</h3>
        <div className="car-list">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`car-item ${car.isBooked ? 'booked' : ''}`}
              onClick={() => !car.isBooked && openModal(car)}
            >
              <img src={car.image} alt={car.brand} className="car-image" />
              <p>{car.brand} - {car.color}</p>
              {car.isBooked ? <p>Booked</p> : <p>Available</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for booking details */}
      {isModalOpen && selectedCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Booking Details</h3>
            <p>You selected: {selectedCar.brand} {selectedCar.color}</p>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={saveBooking}>Confirm Booking</button>
            <button onClick={closeModal}>Close</button>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}

      {/* Booking History */}
      <div className="booking-history">
        <h3>Your Booking History</h3>
        {bookingList.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Car Model</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rental Days</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.car.brand} {booking.car.color}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.rentalDays}</td>
                  <td>${booking.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Booking;
