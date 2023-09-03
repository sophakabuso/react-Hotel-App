import React from 'react';
import Facilities from '../components/Facilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Home.module.css'; // Import your CSS module here
import backgroundImage from '../assets/images/backgroundImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
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
       <div id="facilities" className={styles.facilitiesContainer}>
       <Facilities />
       </div>
      

      {/* You can add more sections or content here */}
    </div>
  );
};

export default Home;
