import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBSCzEg3kvmE96JUzk5Kn46sZuW77Juh0o',
  authDomain: 'react-native-food-application.firebaseapp.com',
  projectId: 'react-native-food-application',
  storageBucket: 'react-native-food-application.appspot.com',
  messagingSenderId: '36372817095',
  appId: '1:36372817095:web:9d11874ac1314927580ae2',
  measurementId: 'G-9Z0LT7MNMP',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
