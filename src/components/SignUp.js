// src/components/SignUp.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth} from '../firebase/config';
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
         //NB specifie that password must be min 6 characters **to add** 
          alert('An error occurred. Please try again.');
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      <div className={styles.logoPlcHolder}>
        <Link to="/Login">HOTELS</Link>
      </div>
      <div>
        <nav className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/facilities">Facilities</Link>
          <Link to="/rooms">Rooms</Link>
        </nav>
      </div>
      </div>
      <div className={styles.formContainer}>
        
        <p>Please Enter Email and Password to become a Member</p>
     
      
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
        <button onClick={goToLogin} className={styles.loginButton}>
          Already have an account? Log In
        </button>
      </div>
      </div>
    </div>
  );
}

export default SignUp;