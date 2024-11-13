import { app } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Set persistence to AsyncStorage
});

// Sign up a new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error; // Propagate error
  }
};

// Log in with an existing user
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error; // Propagate error
  }
};

// Log out the current user
export const logOut = async () => {
  try {
    await signOut(auth); // Sign the user out
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error; // Propagate error
  }
};

// Listener for authentication state changes (logs in or out)
export const onAuthStateChangedListener = (callback) => {
  const unsubscribed = onAuthStateChanged(auth, (user) => {
    callback(user); // Pass the user object to the callback function
  });

  return unsubscribed
};
