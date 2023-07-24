// Favorites.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Correctly import db from firebaseConfig
import styles from './Favorites.module.css';

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const favoritesRef = db.collection('favorites').doc(user.uid);
          const favoritesSnapshot = await favoritesRef.get();

          if (favoritesSnapshot.exists) {
            setFavorites(favoritesSnapshot.data().favorites);
          } else {
            console.log('No favorites found for the user.');
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };

      fetchFavorites();
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <ul className={styles.favoritesList}>
        {favorites.map((roomId) => (
          <li key={roomId}>{`Room ${roomId}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
