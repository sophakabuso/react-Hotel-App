import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQ6wXSPBG7O63y3H0fY6TAH-lo27ZDcK4",
  authDomain: "hotel-rsv.firebaseapp.com",
  projectId: "hotel-rsv",
  storageBucket: "hotel-rsv.appspot.com",
  messagingSenderId: "1079594021352",
  appId: "1:1079594021352:web:d20c43a1441cfa7fe8b45d",
  measurementId: "G-L7DX5NDMY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };