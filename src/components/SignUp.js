// src/components/SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db} from '../firebase/config';

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToLoginForm = () => {
    history.push('/LoginForm');
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
          history.push('/LoginForm');
        })
        .catch((error) => {
          console.log(error);
          alert('An error occurred. Please try again.');
        });
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button onClick={goToLoginForm}>Already have an account? Log In</button>
      </div>
    </div>
  );
}

export default SignUp;
