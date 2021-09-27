import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyDGmi-BvzCo5_kmJUIuSHdGwVykab87UHk",
  authDomain: "armazem-do-campo-b9794.firebaseapp.com",
  databaseURL: "https://armazem-do-campo-b9794-default-rtdb.firebaseio.com",
  projectId: "armazem-do-campo-b9794",
  storageBucket: "armazem-do-campo-b9794.appspot.com",
  messagingSenderId: "412145691200",
  appId: "1:412145691200:web:9f6e0f71a2006aae3b8da5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
