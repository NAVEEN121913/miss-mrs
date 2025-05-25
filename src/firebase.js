// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYAHoAv9hEquvwFubEhwC-KX3k1-V2vyQ",
  authDomain: "e-com-53673.firebaseapp.com",
  databaseURL: "https://e-com-53673-default-rtdb.firebaseio.com",
  projectId: "e-com-53673",
  storageBucket: "e-com-53673.firebasestorage.app",
  messagingSenderId: "230757271668",
  appId: "1:230757271668:web:e16d03db9d7f7311e16921",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);

export { ref, set, push };
