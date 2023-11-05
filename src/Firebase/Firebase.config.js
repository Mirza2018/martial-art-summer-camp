// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmvXHQqeh8D9xXrnRtFgSyL_RwOyhsatM",
    authDomain: "martial-art-camp.firebaseapp.com",
    projectId: "martial-art-camp",
    storageBucket: "martial-art-camp.appspot.com",
    messagingSenderId: "443478236542",
    appId: "1:443478236542:web:1aeceedea20700ba33e72f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;