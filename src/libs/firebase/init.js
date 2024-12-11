// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwiecm_NsyOmg5gA9r4B2wGlYPEzjPhtc",
  authDomain: "cepat-pintar-app.firebaseapp.com",
  projectId: "cepat-pintar-app",
  storageBucket: "cepat-pintar-app.firebasestorage.app",
  messagingSenderId: "656145541290",
  appId: "1:656145541290:web:6ab09cba35252888b348d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app