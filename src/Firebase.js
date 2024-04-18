// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKpB5SX0SoAdHVDqq7zKxpdWVHVFr2xck",
  authDomain: "simplenote-5703a.firebaseapp.com",
  databaseURL: "https://simplenote-5703a-default-rtdb.firebaseio.com",
  projectId: "simplenote-5703a",
  storageBucket: "simplenote-5703a.appspot.com",
  messagingSenderId: "576772334121",
  appId: "1:576772334121:web:793683a2083d06d4c77238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;