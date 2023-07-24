import React from 'react';
import styles from './Facilities.module.css';
import gympic from '../assets/images/gympic.jpeg';
import gympic2 from '../assets/images/gympic2.jpeg';
import gympic3 from '../assets/images/gympic3.jpeg';
import poolsidebarpic from '../assets/images/poolsidebarpic.jpeg';
import poolsidebarpic2 from '../assets/images/poolsidebarpic2.jpeg';
import poolsidebarpic3 from '../assets/images/poolsidebarpic3.jpeg';
import swimmingpoolpic from '../assets/images/swimmingpoolpic.jpeg';
import swimmingpoolpic2 from '../assets/images/swimmingpoolpic2.jpeg';
import swimmingpoolpic3 from '../assets/images/swimmingpoolpic3.jpeg';
import spapic from '../assets/images/spapic.jpeg';
import spapic2 from '../assets/images/spapic2.jpeg';
import spapic3 from '../assets/images/spapic3.jpeg';
import resturantpic from '../assets/images/resturantpic.jpeg';
import resturantpic2 from '../assets/images/resturantpic2.jpeg';
import resturantpic3 from '../assets/images/resturantpic3.jpeg';
import laundrypic from '../assets/images/laundrypic.jpeg';
import laundrypic2 from '../assets/images/laundrypic2.jpeg';
import laundrypic3 from '../assets/images/laundrypic3.jpeg';

function Facilities() {
  return (
    <div className={styles.facilitiesContainer}>
      <div className={styles.facility}>
        <h1>FACILITIES</h1>
        <p className={styles.facilityDescription}>
        Experience world-class amenities and exceptional services in our luxurious hotel. Enjoy state-of-the-art facilities including a fully equipped gym, relaxing spa, refreshing swimming pool, exquisite restaurant, and efficient laundry service. Indulge in a truly remarkable stay with us.
        </p>
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={gympic} alt="Gym" />
          <img src={gympic2} alt="Gym" />
          <img src={gympic3} alt="Gym" />
          
        </div>
        
        <h2>THE GYM</h2>
    
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={poolsidebarpic} alt="Poolside Bar" />
          <img src={poolsidebarpic2} alt="Poolside Bar" />
          <img src={poolsidebarpic3} alt="Poolside Bar" />
        </div>
        <h2>POOLSIDE BAR</h2>
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={swimmingpoolpic} alt="Swimming Pool" />
          <img src={swimmingpoolpic2} alt="Swimming Pool" />
          <img src={swimmingpoolpic3} alt="Swimming Pool" />
        </div>
        <h2>SWIMMING POOL</h2>
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={spapic} alt="The Spa" />
          <img src={spapic2} alt="The Spa" />
          <img src={spapic3} alt="The Spa" />
        </div>
        <h2>THE SPA</h2>
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={resturantpic} alt="Restaurant" />
          <img src={resturantpic2} alt="Restaurant" />
          <img src={resturantpic3} alt="Restaurant" />
        </div>
        <h2>RESTAURANT</h2>
      </div>
      <div className={styles.facility}>
        <div className={styles.imageContainer}>
          <img src={laundrypic} alt="Laundry" />
          <img src={laundrypic2} alt="Laundry" />
          <img src={laundrypic3} alt="Laundry" />
        </div>
        <h2>LAUNDRY</h2>
      </div>
    </div>
  );
}

export default Facilities;
