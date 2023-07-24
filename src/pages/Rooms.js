// Rooms.js
import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import { firestore } from '../firebase/firebaseConfig';
import styles from './Rooms.module.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = firestore.collection('rooms');
        const snapshot = await roomsRef.get();
        const roomData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Rooms</h2>
      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} image={room.image} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
