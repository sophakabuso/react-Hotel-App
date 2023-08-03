// src/components/LoginForm.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import styles from './Login.module.css'; // Import the CSS module

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToSignUp = () => {
    history.push('/SignUp');
  };

  const goToResetPassword = () => {
    history.push('/ResetPassword');
  };

  const validateInput = () => {
    if (!email || !password) {
      alert('Please fill in all fields!');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateInput()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Login Success');
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          alert('Login failed. Please try again.');
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
        <p>Please Enter Email and Password to login</p>
      
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
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
        <button onClick={goToSignUp}>Not a member? Sign Up</button>
        <button onClick={goToResetPassword}>Forgot Password?</button>
      </div>
      </div>
      </div>
  );
}

export default Login;