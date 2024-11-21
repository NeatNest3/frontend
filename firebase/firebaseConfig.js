import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCKiTHbr8HDOdHfi8tWIYMtf6L37KGVhxk",
  authDomain: "neatnest-308c4.firebaseapp.com",
  projectId: "neatnest-308c4",
  storageBucket: "neatnest-308c4.firebasestorage.app",
  messagingSenderId: "1039763766996",
  appId: "1:1039763766996:web:a5c284a121939b1bcf8541",
  measurementId: "G-9JCELSMHLR",
};

const app = initializeApp(firebaseConfig);




export { app};