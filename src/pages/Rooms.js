
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

import styles from './Rooms.module.css';

const Rooms = () => {
  const [favorites, setFavorites] = useState([]);
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
      <h2 className={styles.title}>Rooms</h2>
      <div className={styles.roomList}>
        {rooms.map((room) => (
          <div key={room.id} className={styles.roomCard}>
            {/* Change the link path to RoomDetails */}
            <Link to={`/Rooms/${room.id}`} style={{ textDecoration: 'none' }}>
              <img src={room.image} alt={room.name} className={styles.picture} />
              <div className={styles.info}>
                <h2 className={styles.name}>{room.name}</h2>
                <p className={styles.features}>{room.features}</p>
                <div className={styles.rating}>
                  <span className={styles.starRating}>
                    {Array.from({ length: room.rating }).map((_, index) => (
                      <span key={index}>&#9733;</span>
                    ))}
                  </span>
                  <span className={styles.ratingText}>{room.rating} Star Ratings</span>
                </div>
                <div className={styles.price}>${room.price} per night</div>
              </div>
            </Link>
            <div className={styles.likeIcon}>
              <button onClick={() => handleAddToFavorites(room.id)}>
                <span role="img" aria-label="Favorite">
                  &#10084;&#65039;
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Favorites</h2>
        <ul className={styles.favorites}>
          {favorites.map((roomId) => (
            <li key={roomId}>
              <Link to={`/Rooms/${roomId}`}>{`Room ${roomId}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
