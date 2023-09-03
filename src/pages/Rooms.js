
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import RoomCard from '../components/RoomCard'; // Import the RoomCard component
import roombg from '../assets/images/roombg.jpeg';
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
      <div className={styles.heroSection} style={{ roombg: `url(${roombg})` }}>
      <div className={styles.header}>
          <div className={styles.links}>
            <nav>
            <Link to="/#facilities" className={styles.navLink}>Facilities</Link>

              <Link to="/rooms" className={styles.navLink}>Rooms</Link>
            </nav>
          </div>
        </div>
        <div className={styles.slogan}>
          <div className={styles.welcomeText}>
            <p >Welcome to</p>
          </div>
          <div className={styles.hotelName}>
            <h1 >SoB </h1>
          </div>
          <div  className={styles.hotelTag}>
            <h2>HOTELS </h2>
          </div>
          <div className={styles.advText}>
          <h2 >Book your stay and enjoy Luxury, redefined at the most affordable rates.</h2>
          </div>
        </div>
      </div>
      <div className={styles.headerRoomsRates}>
        <div className={styles.roomName}>
        <h2 >ROOMS AND RATES</h2>
        </div>
        <div className={styles.roomDescription}>
        <p>Welcome to, where elegance meets comfort. Each room is tastefully designed with modern amenities and plush furnishings to ensure a relaxing stay. Enjoy, indulge in our premium bedding, and pamper yourself in the well-appointed en-suite bathrooms. Experience unparalleled hospitality and make lasting memories.</p>
        </div>
      </div>
     
      
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
      <div className={styles.containerFavorites}>
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
