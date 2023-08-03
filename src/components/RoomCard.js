import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RoomCard.module.css';

const RoomCard = ({ room, favorites, handleAddToFavorites }) => {
  const isFavorite = favorites.includes(room.id);

  return (
    <div className={styles.roomCard}>
        <div>
        <img src={room.image} alt={room.name} className={styles.picture} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{room.name}</h2>
          <p className={styles.features}>{room.features}</p>
          <Link to={`/Rooms/${room.id}`} className={styles.bookNowButton}>
            BOOK
          </Link>
          <div className={styles.rating}>
            <span className={styles.starRating}>
              {Array.from({ length: room.rating }).map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            </span>
            <span className={styles.ratingText}>{room.rating} Star Ratings</span>
          </div>
        
        </div>
      <div className={styles.likeIcon}>
        <button onClick={() => handleAddToFavorites(room.id)}>
          <span role="img" aria-label="Favorite">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
        <div className={styles.price}>R{room.price} / night</div>
      </div>
        
    </div>
  );
};

export default RoomCard;
