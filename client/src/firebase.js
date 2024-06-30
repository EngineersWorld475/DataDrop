// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'datadrop-544be.firebaseapp.com',
  projectId: 'datadrop-544be',
  storageBucket: 'datadrop-544be.appspot.com',
  messagingSenderId: '339868584540',
  appId: '1:339868584540:web:48eec7218948629d1b7499',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
