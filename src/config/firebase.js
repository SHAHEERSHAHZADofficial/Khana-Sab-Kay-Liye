// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,sendEmailVerification,signOut} from "firebase/auth"
import {getFirestore,setDoc,doc,collection,getDoc,updateDoc,deleteDoc} from "firebase/firestore"
import {getStorage,getDownloadURL,uploadBytes,ref} from "firebase/storage"
// import * as firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIfY4Q9IZeanPKyY0V8FpJQE1tsh-nUpw",
    authDomain: "newprojectpractice.firebaseapp.com",
    projectId: "newprojectpractice",
    storageBucket: "newprojectpractice.appspot.com",
    messagingSenderId: "574441053330",
    appId: "1:574441053330:web:c4cecee72e79d18593da4b",
    measurementId: "G-PYH7BGXE8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db =getFirestore()
const storage = getStorage()
export{
    // firebase,
    auth,
    db,
    storage,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    setDoc,
    doc,
    collection,
    getDoc,
    updateDoc,
    deleteDoc,
    getDownloadURL,
    uploadBytes,
    ref,
    
}