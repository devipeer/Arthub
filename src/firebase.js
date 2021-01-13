// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0m-nLB-Hblo6UdjSI6y9B7pLXHOsUofU",
  authDomain: "arthub-24673.firebaseapp.com",
  projectId: "arthub-24673",
  storageBucket: "arthub-24673.appspot.com",
  messagingSenderId: "1023403557914",
  appId: "1:1023403557914:web:e943d6a018a68bb681bda3",
  measurementId: "G-075TGM24Q1"
};
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC0m-nLB-Hblo6UdjSI6y9B7pLXHOsUofU",
  authDomain: "arthub-24673.firebaseapp.com",
  projectId: "arthub-24673",
  storageBucket: "arthub-24673.appspot.com",
  messagingSenderId: "1023403557914",
  appId: "1:1023403557914:web:e943d6a018a68bb681bda3",
  measurementId: "G-075TGM24Q1"
});

const db = firebaseApp.firestone();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};
//export default db;