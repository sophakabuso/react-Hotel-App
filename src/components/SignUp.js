// src/components/SignUp.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db} from '../firebase/config';
import styles from './Login.module.css'

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToLogin = () => {
    history.push('/Login');
  };

  const validateInput = () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields!');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match!');
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (validateInput()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Registration successful!');
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert('An error occurred. Please try again.');
        });
    }
  };

  return (
    <div>
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
      <h1>Welome to Leisure, Pleasure, and Luxury redefined.</h1>
       <p>Please Enter Email and Password to become a Member</p>
       <Link to="/">Home</Link>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={goToLogin}>Already have an account? Log In</button>
      </div>
    </div>
  );
}

export default SignUp;
