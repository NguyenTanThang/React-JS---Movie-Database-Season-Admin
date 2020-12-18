import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDMSdZDMi8v2BuA5lZCanfn7iIfJsnAw6E",
    authDomain: "movie-database-season.firebaseapp.com",
    projectId: "movie-database-season",
    storageBucket: "movie-database-season.appspot.com",
    messagingSenderId: "814284809441",
    appId: "1:814284809441:web:f7fceb9eecd6a886ca03a0",
    measurementId: "G-3TDWSDFFCW"
};

/*
var firebaseConfig = {
    apiKey: "AIzaSyCJVHDv8tR5BA2222e2YqbOUqLnnJYZnMM",
    authDomain: "movie-database-season-backup.firebaseapp.com",
    projectId: "movie-database-season-backup",
    storageBucket: "movie-database-season-backup.appspot.com",
    messagingSenderId: "1074485732551",
    appId: "1:1074485732551:web:c6da6f2449bd3a1c560ae2",
    measurementId: "G-138K6G9GLB"
};
*/

export const app = firebase.initializeApp(firebaseConfig);
export const firebaseStorage = app.storage();