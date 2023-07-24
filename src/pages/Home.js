import React from 'react';
import Facilities from '../components/Facilities';
import styles from './Home.module.css';
import backgroundImage from '../assets/images/backgroundImage.jpg';
import logoImage from '../assets/images/logoImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.logo}>
          <img src={logoImage} alt="Hotel Logo" className={styles.logoImage} />
          <h1 className={styles.headingLogo}>BMBhotels</h1>
        </div>
        <nav className={styles.links}>
          <Link to="/LoginForm">Members</Link>
          <Link to="/facilities">Facilities</Link>
          <Link to="/rooms">Rooms</Link>
        </nav>
        <div className={styles.slogan}>
          <div>
            <p>Welcome to</p>
            <h2>leisure, pleasure, and luxury redefined.</h2>
            <h3>BMB HOTELS</h3>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <Facilities />

      {/* You can add more sections or content here */}
    </div>
  );
};

export default Home;
