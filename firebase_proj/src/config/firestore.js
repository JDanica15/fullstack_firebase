// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDg777L7xH-WBimCj4ofl5XUIzIMZEjZ9o',
  authDomain: 'socialape-29b33.firebaseapp.com',
  databaseURL: 'https://socialape-29b33.firebaseio.com',
  projectId: 'socialape-29b33',
  storageBucket: 'socialape-29b33.appspot.com',
  messagingSenderId: '948640288697',
  appId:  '1:948640288697:web:8ab31feadab022064cb068',
  measurementId: 'G-227BEPW8E9'
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;