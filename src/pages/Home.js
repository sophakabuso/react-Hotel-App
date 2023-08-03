import React from 'react';
import Facilities from '../components/Facilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Home.module.css';
import backgroundImage from '../assets/images/backgroundImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.header}>
          <div className={styles.logoPlcHolder}>
            <Link to="/Login">HOTELS</Link>
          </div>
          <div className={styles.links}>
            <nav>
              <Link to="/Login">Members</Link>
              <Link to="/facilities">Facilities</Link>
              <Link to="/rooms">Rooms</Link>
            </nav>
          </div>
          <div className={styles.socialMediaLinks}>
            {/* Add social media links with Font Awesome icons */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        <div className={styles.slogan}>
          <div>
            <h1 className={styles.headingLogo}>SOB hotels</h1>
            <p>Welcome to</p>
            <h2>Leisure, Pleasure, and Luxury redefined.</h2>
          </div>
        </div>
      </div>

      <Facilities />

      {/* You can add more sections or content here */}
    </div>
  );
};

export default Home;
