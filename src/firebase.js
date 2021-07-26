import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// firebase initialized
firebase.initializeApp(
    {
        apiKey: "AIzaSyA5YL4WG3KTdCgPB9GYyU47DyEH8qcaU3Q",
        authDomain: "reels-37681.firebaseapp.com",
        projectId: "reels-37681",
        storageBucket: "reels-37681.appspot.com",
        messagingSenderId: "442429481994",
        appId: "1:442429481994:web:86426912b2f4320c3fabf3"
    }
);

// auth variable for authentication
export const auth = firebase.auth();

// firestore variable for firestore
const firestore = firebase.firestore();

// restricting access to firestore
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage();

// export default firebase;