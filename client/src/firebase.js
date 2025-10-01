import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_QGJHJRFuxQIHBy5932yDJcfVulkz_RI",

  authDomain: "react-jobs-db181.firebaseapp.com",

  projectId: "react-jobs-db181",

  storageBucket:"react-jobs-db181.appspot.com",

  messagingSenderId: "951958535234",

  appId: "1:951958535234:web:fca2be6c95eb32b27981db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(app);

export { auth };
