// src/components/SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // The regular expression above enforces the following requirements for the password:
  // - At least 8 characters long
  // - Contains at least one lowercase letter
  // - Contains at least one uppercase letter
  // - Contains at least one digit
  // - Contains at least one special character (@, $, !, %, *, ?, &)

  const goToLogin = () => {
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

    // Implement password strength validation here if desired
    // e.g., check if the password meets the required criteria
    if (!passwordRequirements.test(password)) {
        alert(
          'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
        );
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
          console.error(error);
          alert('Login failed. Please try again.');
        });
    }
  };

  const handleSignUp = () => {
    if (validateInput()) {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(false);
          alert('Registration successful!');
          history.push('/Login');
        })
        .catch((error) => {
          setIsLoading(false);
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
        <button onClick={handleSignUp} disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button onClick={goToLogin}>Already have an account? Log In</button>
      </div>
    </div>
  );
}

export default SignUp;
