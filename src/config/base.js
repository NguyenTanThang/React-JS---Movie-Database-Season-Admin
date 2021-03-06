import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDY3-H9jPwg0UAMjkYZmymRTMmgijLFZ-s",
    authDomain: "chat-test-d1f4c.firebaseapp.com",
    projectId: "chat-test-d1f4c",
    storageBucket: "chat-test-d1f4c.appspot.com",
    messagingSenderId: "963466464477",
    appId: "1:963466464477:web:d71dad18b77e5696035f34",
    measurementId: "G-2HH4WBGWLS"
};

export const app = firebase.initializeApp(firebaseConfig);
export const firebaseStorage = app.storage();