import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyC6BN4LmuR7iImfzGUuF-bLMlfHYzJAOUA",
  authDomain: "book-santa-app-ed416.firebaseapp.com",
  databaseURL: "https://book-santa-app-ed416.firebaseio.com",
  projectId: "book-santa-app-ed416",
  storageBucket: "book-santa-app-ed416.appspot.com",
  messagingSenderId: "968763043007",
  appId: "1:968763043007:web:872ad87c1ef3d84a32ea0a"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
