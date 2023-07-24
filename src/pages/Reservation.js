// Reservation.js
import React, {useEffect,useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { db, auth } from '../firebase/firebaseConfig';
import styles from './Reservation.module.css';

function Reservation() {
  const [room, setRoom] = useState(null);
  const [fullName, setFullName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numNights, setNumNights] = useState(1);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Fetch room data based on the ID
    const fetchRoom = async () => {
      try {
        const roomRef = db.collection('rooms').doc(id);
        const roomSnapshot = await roomRef.get();
        if (roomSnapshot.exists) {
          // Set the room data from Firestore, including image, features, and price
          setRoom(roomSnapshot.data());
        } else {
          // Handle room not found
          history.push('/PageDontExist');
        }
      } catch (error) {
        console.log('Error fetching room:', error);
        // Handle error
      }
    };

    fetchRoom();
  }, [history, id]);

  const handleReservation = async () => {
    try {
      const user = auth.currentUser;
      const reservation = {
        room: room.id,
        fullName,
        checkInDate,
        checkOutDate,
        numAdults,
        numChildren,
        numNights,
        userId: user.uid,
      };

      // Save reservation to Firestore
      await db.collection('reservations').add(reservation);

      alert('Reservation successful!');
    } catch (error) {
      console.log('Error making reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleIncrement = (stateSetter) => {
    stateSetter((prevValue) => prevValue + 1);
  };

  const handleDecrement = (stateSetter) => {
    stateSetter((prevValue) => Math.max(prevValue - 1, 0));
  };

  if (!room) {
    // Render loading state or return null
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reserve Room: {room.name}</h2>
      <img src={room.image} alt={room.name} className={styles.roomImage} />
      <div className={styles.roomFeatures}>
        <h3>Room Features:</h3>
        <ul>
          {room.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p>Price per Night: ${room.price}</p>
      </div>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numAdults">Number of Adults:</label>
          <div className={styles.numberInput}>
            <button onClick={() => handleDecrement(setNumAdults)}>-</button>
            <span>{numAdults}</span>
            <button onClick={() => handleIncrement(setNumAdults)}>+</button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numChildren">Number of Children:</label>
          <div className={styles.numberInput}>
            <button onClick={() => handleDecrement(setNumChildren)}>-</button>
            <span>{numChildren}</span>
            <button onClick={() => handleIncrement(setNumChildren)}>+</button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numNights">Number of Nights:</label>
          <div className={styles.numberInput}>
            <button onClick={() => handleDecrement(setNumNights)}>-</button>
            <span>{numNights}</span>
            <button onClick={() => handleIncrement(setNumNights)}>+</button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <button onClick={handleReservation}>Reserve</button>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
