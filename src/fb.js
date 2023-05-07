// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_G6geHI-hbNG1KoRiYRhw84IBV1ZvVk0",
    authDomain: "notebook-34af5.firebaseapp.com",
    projectId: "notebook-34af5",
    storageBucket: "notebook-34af5.appspot.com",
    messagingSenderId: "776013136589",
    appId: "1:776013136589:web:29e1192ed54bd24f8b9f84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default {db,storage}