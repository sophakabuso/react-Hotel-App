
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReservationSuccess.module.css';

const ReservationSuccess = ({ room, checkInDate, checkOutDate }) => {
  const history = useHistory(); // Get the history object using the useHistory hook

  // Redirect to the home page after a short delay (e.g., 3 seconds)
  React.useEffect(() => {
    const redirectHome = setTimeout(() => {
      history.push('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(redirectHome); // Cleanup the timeout on unmount
  }, [history]);

  return (
    <div className={styles.reservationSuccessContainer}>
      <h2 className={styles.reservationSuccessTitle}>Reservation Successful!</h2>
      <p className={styles.roomName}>You have successfully reserved {room.name}.</p>
      <p className={styles.date}>Check-in Date: {checkInDate}</p>
      <p className={styles.date}>Check-out Date: {checkOutDate}</p>
      <p className={styles.message}>An email has been sent to you with all the details regarding your booking.</p>
      <p className={styles.enjoyMessage}>Enjoy your stay when you visit our hotels.</p>
    </div>
  );
};

export default ReservationSuccess;
