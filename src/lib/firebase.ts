// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVhip7Y6mW3JSi_6u2_ffv18xcnsLAkm4",
  authDomain: "sufi-s-kitchen.firebaseapp.com",
  projectId: "sufi-s-kitchen",
  storageBucket: "sufi-s-kitchen.appspot.com",
  messagingSenderId: "518964937353",
  appId: "1:518964937353:web:7230bdfbf734578cfc7c58",
  measurementId: "G-L1PENC0L5E"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, analytics };
