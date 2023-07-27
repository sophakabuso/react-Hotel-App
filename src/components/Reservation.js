import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import SuccessReserv from './SuccessReserv'; // Import the SuccessReserv component

import styles from './Reservation.module.css';

function Reservation() {
  const [room, setRoom] = useState(null);
  const [fullName, setFullName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false); // State to track reservation success

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = db.collection('rooms').doc(id);
        const roomSnapshot = await roomRef.get();
        if (roomSnapshot.exists) {
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
        userId: user.uid,
      };

      // Save reservation to Firestore
      await db.collection('reservations').add(reservation);

      // Update the state to indicate reservation success
      setReservationSuccess(true);
    } catch (error) {
      console.log('Error making reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!room) {
    // Render loading state or return null
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Conditionally render SuccessReserv if reservationSuccess is true */}
      {reservationSuccess ? (
        <SuccessReserv room={room} checkInDate={checkInDate} checkOutDate={checkOutDate} />
      ) : (
        <>
          <h2 className={styles.title}>Reserve Room: {room.name}</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Check-in Date:</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Check-out Date:</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <button onClick={handleReservation} className={styles.button}>
            Reserve Room
          </button>
        </>
      )}
    </div>
  );
}

export default Reservation;
