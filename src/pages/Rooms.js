
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Rooms.module.css';
import { auth, db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  const [favorites, setFavorites] = useState([]);
  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, 'rooms');
        const snapshot = await getDocs(roomsRef);
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

  const handleAddToFavorites = (roomId) => {
    setFavorites((prevFavorites) => [...prevFavorites, roomId]);
  };

  const handleBookRoom = (roomId) => {
    const selectedRoom = rooms.find((room) => room.id === roomId);
    if (selectedRoom) {
      history.push({
        pathname: `/reservation/${roomId}`,
        state: { room: selectedRoom },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Rooms</h2>
      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onAddToFavorites={() => handleAddToFavorites(room.id)}
            onBookRoom={() => handleBookRoom(room.id)}
            favorites={favorites}
          />
        ))}
      </div>
      <div>
        <h2>Favorites</h2>
        <ul className={styles.favorites}>
          {favorites.map((roomId) => (
            <li key={roomId}>
              <Link to={`/reservation/${roomId}`}>{`Room ${roomId}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
