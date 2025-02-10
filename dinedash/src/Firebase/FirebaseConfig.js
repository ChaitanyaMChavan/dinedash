// import { initializeApp } from 'firebase/app';

// import firebase from 'firebase/app';
// import 'firebase/firestore';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyCOUPlDKU5WQFjaqez1uro2NHc4koKj_hM",
    authDomain: "dine-dash-3b4ba.firebaseapp.com",
    projectId: "dine-dash-3b4ba",
    storageBucket: "dine-dash-3b4ba.firebasestorage.app",
    messagingSenderId: "844774401800",
    appId: "1:844774401800:web:bb996d5b89ae0fcea26ebd"
};

//Intialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


export { firebase }