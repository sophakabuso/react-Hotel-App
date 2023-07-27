import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import styles from './RoomDetails.module.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = doc(db, 'rooms', id);
        const roomSnapshot = await getDoc(roomRef);
        if (roomSnapshot.exists()) {
          setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
        } else {
          // Handle room not found
        }
      } catch (error) {
        console.log('Error fetching room:', error);
        // Handle error
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img src={room.image} alt={room.name} className={styles.picture} />
      <div className={styles.info}>
        <h2 className={styles.name}>{room.name}</h2>
        <p className={styles.features}>{room.features}</p>
        <div className={styles.rating}>
          <span className={styles.starRating}>Stars: {room.rating}</span>
        </div>
        <div className={styles.price}>${room.price} per night</div>
        {/* Move the Link component outside the button */}
        <Link to={`/Reservation/${room.id}`} className={styles.reserveBtn}>
          Reserve Now
        </Link>
      </div>
    </div>
  );
};

export default RoomDetails;
