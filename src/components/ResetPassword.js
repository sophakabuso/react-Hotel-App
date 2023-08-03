// ResetPassword.js

import React, { useState } from "react";
import {  Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth} from "../firebase/config";
import styles from "./ResetPassword.module.css"; // Import the CSS module

function ResetPassword() {
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email to reset your password."); // display a success message
      })
      .catch((error) => {
        // handle the error if the password reset email couldn't be sent
        console.error(error);
      });
  };

  const [email, setEmail] = useState("");

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
        <div>
          <p>Please Enter Email to Reset Password</p>
        </div>
        <div>
          <label className={styles.label}>Enter Email:</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          /><br></br>
          <button className={styles.resetButton} onClick={resetPassword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
