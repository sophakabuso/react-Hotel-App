import React from 'react';
import Facilities from '../components/Facilities';
//mport Login from '../components/Login'
import styles from './Home.module.css';
import backgroundImage from '../assets/images/backgroundImage.jpg';
import logoImage from '../assets/images/logoImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.header}>
          <div className={styles.logoPlcHolder} >
            <Link to="/Login"> HOTELS</Link>

          </div>
          <div>
            <nav className={styles.links}>
              <Link to="/Login">Members</Link>
              <Link to="/facilities">Facilities</Link>
              <Link to="/rooms">Rooms</Link>
            </nav>
          </div>
          <div>
            <nav>
              <link></link>
              <link></link>
              <link></link>
            </nav>
          </div>
        </div>

        <div className={styles.slogan}>
          <div>
            <h1 className={styles.headingLogo}>BMB hotels</h1>
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
