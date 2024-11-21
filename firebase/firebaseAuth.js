import { app } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Set persistence to AsyncStorage
});


export const signUp = async (email, password) => {
  try {

    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user 

  } catch (error) {
    console.error("Error creating account on final steps:", error.message); // Set the error here
    throw error; // Propagate error if failed
  }
};



// LogIn Function
export const logIn = async (email, password) => {
  try {
    // Step 1: Sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Get Firebase ID token
    const idToken = await user.getIdToken();

    return idToken
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;  // Propagate error if failed
  }
};

// LogOut Function
export const logOut = async () => {
  try {
    await signOut(auth); // Firebase sign-out
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
};

// Listener for authentication state changes
export const onAuthStateChangedListener = (callback) => {
  const unsubscribed = onAuthStateChanged(auth, (user) => {
    callback(user); // Pass the user object to the callback function
  });

  return unsubscribed;
};
