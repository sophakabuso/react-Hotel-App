// import necessary dependencies
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import React from "react";
import { auth,db } from "../firebase/config"; // import auth from your Firebase configuration file
import styles from "./ResetPassword.module..css";

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
      <div>
        <h1 className={styles.title}>Reset your Password.</h1>
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
