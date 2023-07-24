import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import styles from './RoomList.module.css';
import { FaHeart } from 'react-icons/fa';
import RoomCard from './RoomCard'; // Import the RoomCard component

const RoomList = () => {
  const [favorites, setFavorites] = useState([]);
  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = db.collection('rooms');
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
      <h1>Room List</h1>
      <div className={styles.roomList}>
        {/* Render RoomCard for each room */}
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            image={room.image}
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

export default RoomList;
