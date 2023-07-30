// import necessary dependencies
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import React from "react";
import { auth,db } from "../firebase/config"; // import auth from your Firebase configuration file
import styles from "./ResetPassword.module.css";

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
      <div className={styles.header}>
        <div>
      <h1>Welome to Leisure, Pleasure, and Luxury redefined.</h1>
       <p>Please Enter Email to Reset Password</p>

       </div>
       </div>
      <div>
        <label className={styles.label}>Enter Email:</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={resetPassword}>Reset Password</button>
      </div>
    </div>
  );
}

export default ResetPassword;
