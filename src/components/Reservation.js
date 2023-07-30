import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import SuccessReserv from './SuccessReserv';
import styles from './Reservation.module.css';

function Reservation() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [fullName, setFullName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // User is logged in, update the state with user information
        setUser(currentUser);
      } else {
        // User is not logged in, set the state to null
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = db.collection('rooms').doc(id);
        const roomSnapshot = await roomRef.get();
        if (roomSnapshot.exists) {
          setRoom(roomSnapshot.data());
        } else {
          history.push('/PageDontExist');
        }
      } catch (error) {
        console.log('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [history, id]);

  const handleReservation = async () => {
    try {
      if (!user) {
        alert('You Must Sign Up First');
        history.push('/Login');
        return;
      }

      const reservation = {
        room: room.id,
        fullName,
        checkInDate,
        checkOutDate,
        userId: user.uid,
      };

      await db.collection('reservations').add(reservation);

      setReservationSuccess(true);
    } catch (error) {
      console.log('Error making reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {reservationSuccess ? (
        <SuccessReserv room={room} checkInDate={checkInDate} checkOutDate={checkOutDate} />
      ) : (
        <>
          {user ? (
            <div>Welcome, {user.displayName}!</div>
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
        </>
      )}
    </div>
  );
}

export default Reservation;
