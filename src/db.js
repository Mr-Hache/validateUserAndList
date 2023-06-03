
import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDjAW4u54i6dQ7xsEpX91LCQKZsvkeiLzA",
    authDomain: "shoppingcrudapp-5027a.firebaseapp.com",
    projectId: "shoppingcrudapp-5027a",
    storageBucket: "shoppingcrudapp-5027a.appspot.com",
    messagingSenderId: "102249232437",
    appId: "1:102249232437:web:88249a2fb91803c3e3997c",
    measurementId: "G-6WPL7CM7FL"
  }



const database = getFirestore(initializeApp(firebaseConfig));

export default database;

