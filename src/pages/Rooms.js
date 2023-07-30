
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import RoomCard from '../components/RoomCard'; // Import the RoomCard component

import styles from './Rooms.module.css';

const Rooms = () => {
  const [favorites, setFavorites] = useState([]); // Define favorites state
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, 'rooms');
        const snapshot = await getDocs(roomsRef);
        const roomData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('roomData:', roomData);
        setRooms(roomData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  console.log('rooms:', rooms);

  const handleAddToFavorites = (roomId) => {
    setFavorites((prevFavorites) => [...prevFavorites, roomId]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoPlcHolder}>
        <Link to="/Login">HOTELS</Link>
      </div>

      <div>
        <nav className={styles.links}>
          <Link to="/Login">Members</Link>
          <Link to="/facilities">Facilities</Link>
          <Link to="/">Home</Link>
        </nav>
      </div>
      <h2 className={styles.title}>ROOMS AND RATES</h2>
      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            favorites={favorites} // Pass favorites to RoomCard component
            handleAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>
      <div>
        <h2>Favorites</h2>
        <ul className={styles.favorites}>
          {favorites.map((roomId) => (
            <li key={roomId}>
              <Link to={`/Reservation/${roomId}`} className={styles.reserveBtn}>
                Reserve Now
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
