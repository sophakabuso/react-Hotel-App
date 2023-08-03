import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReservationSuccess from './ReservationSuccess';
import styles from './RoomDetails.module.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const history = useHistory();
  const user = {id}
  // Fetch the room details from the database based on the room ID
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // Get a reference to the room document in the "rooms" collection
        const roomRef = doc(db, 'rooms', id);
        // Fetch the room data from the database
        const roomSnapshot = await getDoc(roomRef);

        // If the room exists, set the "room" state with the data
        if (roomSnapshot.exists()) {
          setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
        } else {
          // Handle the case when the room is not found (e.g., display an error message or redirect to a 404 page)
          console.log('Room not found');
        }
      } catch (error) {
        console.log('Error fetching room:', error);
        // Handle any errors that occurred during the fetch
      }
    };

    fetchRoom();
  }, [id]);

  // Handle the reservation logic when the "Reserve Now" button is clicked
  const handleReservation = async () => {
    try {
      // Check if the user is logged in
      if (!user) {
        alert('You must sign in before making a reservation.');
        history.push('/Login'); // Redirect to the login page
        return;
      }

      // Create a reservation object with necessary data
      const reservationData = {
        roomId: room.id,
        userId: user.id,
        checkInDate: '2023-08-10', // Replace with the actual check-in date
        checkOutDate: '2023-08-15', // Replace with the actual check-out date
        // Add any other relevant reservation details as needed
      };

      // Step 3: Add the reservation data to the "reservations" collection in Firestore
      await addDoc(collection(db, 'reservations'), reservationData);

      // If the reservation is successful, set the "reservationSuccess" state to true
      setReservationSuccess(true);
    } catch (error) {
      console.log('Error making reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      {room && ( // Add a check for room data before rendering
        reservationSuccess ? (
          // If the reservation is successful, display the "ReservationSuccess" component with the room details
          <ReservationSuccess room={room} />
        ) : (
          // If the reservation is not successful, display the room details and reservation button
          <>
            <img src={room.image} alt={room.name} className={styles.picture} />
            <div className={styles.info}>
              <h2 className={styles.name}>{room.name}</h2>
              <p className={styles.features}>{room.features}</p>
              <div className={styles.rating}>
                <span className={styles.starRating}>Stars: {room.rating}</span>
              </div>
              <div className={styles.price}>R{room.price} / night</div>
              <button onClick={handleReservation} className={styles.reserveBtn}>
                Reserve Now
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
  
};

export default RoomDetails;
