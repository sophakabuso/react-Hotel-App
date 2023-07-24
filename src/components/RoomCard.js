import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './RoomCard.module.css';

const RoomCard = ({ room, image, onAddToFavorites, onBookRoom, favorites }) => {
  console.log('Room Card Data:', room); 
  const handleAddToFavorites = () => {
    onAddToFavorites(room.id);
  };

  const handleBookRoom = () => {
    onBookRoom(room.id);
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.likeIcon} onClick={handleAddToFavorites}>
        <FaHeart />
      </div>
      <img src={image} alt={room.name} className={styles.picture} />
      <div className={styles.info}>
        <h2 className={styles.name}>{room.name}</h2>
        <p className={styles.features}>{room.features}</p>
        <div className={styles.rating}>
          <span className={styles.starRating}>{renderStarRating(room.rating)}</span>
          <span className={styles.ratingText}>{room.rating} Star Ratings</span>
        </div>
        <div className={styles.price}>${room.price} per night</div>
        <button onClick={handleBookRoom}>Book</button>
      </div>
    </div>
  );
};

export default RoomCard;
