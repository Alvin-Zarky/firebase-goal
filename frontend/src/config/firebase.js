import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANN_9T161Stxq5VYswHta8lvoPXj83aAc",
  authDomain: "desk-app-goal.firebaseapp.com",
  databaseURL: "https://desk-app-goal-default-rtdb.firebaseio.com",
  projectId: "desk-app-goal",
  storageBucket: "desk-app-goal.appspot.com",
  messagingSenderId: "852126786175",
  appId: "1:852126786175:web:09b74ed42cae03ebd2154a"
};

firebase.initializeApp(firebaseConfig);

const firestore= firebase.firestore()
const auth= firebase.auth()
const storage= firebase.storage()
const database= firebase.database()
const timestamps= firebase.firestore.Timestamp

export {
  firestore,
  auth,
  storage,
  database,
  timestamps
}