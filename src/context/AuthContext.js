import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Your Firebase config
import { useNavigate } from 'react-router-dom';

// Create the Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // SignUp Function (You may implement this with Firebase)
  const signUp = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      throw error;
    }
  };

  // Login Function
  const logIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // Log Out Function
  const logOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null); // Clear the user from state
      navigate('/login');   // Redirect to login page after logging out
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  };

  // Function to handle user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, logIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};





