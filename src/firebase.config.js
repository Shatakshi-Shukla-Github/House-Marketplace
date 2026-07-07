// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";


// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB-X4nTiV7Uvyvf48vbyfvEWGcCzpCP0Pg",
//     authDomain: "house-marketplace-app-2d39f.firebaseapp.com",
//     projectId: "house-marketplace-app-2d39f",
//     storageBucket: "house-marketplace-app-2d39f.appspot.com",
//     messagingSenderId: "679005978020",
//     appId: "1:679005978020:web:62abf9904dbefe4e1c1531"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);




import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-X4nTiV7Uvyvf48vbyfvEWGcCzpCP0Pg",
    authDomain: "house-marketplace-app-2d39f.firebaseapp.com",
    projectId: "house-marketplace-app-2d39f",
    storageBucket: "house-marketplace-app-2d39f.appspot.com",
    messagingSenderId: "679005978020",
    appId: "1:679005978020:web:62abf9904dbefe4e1c1531"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// CRITICAL FIX: Pass the explicit string "(default)" into the second argument
export const db = getFirestore(app, "default");

export const auth = getAuth(app);