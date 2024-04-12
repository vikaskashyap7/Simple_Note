// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNVlVhT1hVDSWkqHB2SuSLmCxA-V2Ere0",
  authDomain: "notes-dbb1c.firebaseapp.com",
  databaseURL: "https://notes-dbb1c-default-rtdb.firebaseio.com",
  projectId: "notes-dbb1c",
  storageBucket: "notes-dbb1c.appspot.com",
  messagingSenderId: "389252438276",
  appId: "1:389252438276:web:a060ff9c5e21d19e7bd851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;