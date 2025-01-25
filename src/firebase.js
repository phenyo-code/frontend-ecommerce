import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB32pwsHjBi3AvvA-q7OHj0XPOcFrreHKU",
  authDomain: "flare-67884.firebaseapp.com",
  databaseURL: "https://flare-67884-default-rtdb.firebaseio.com",
  projectId: "flare-67884",
  storageBucket: "flare-67884.appspot.com",
  messagingSenderId: "1019737822136",
  appId: "1:1019737822136:web:90b3539f041eead45d354d",
  measurementId: "G-FPBS5L6ST5"
};

// Initialize Firebase if not already initialized
const app = initializeApp(firebaseConfig);

// Export the Firebase auth instance
export const auth = getAuth(app);





