import * as firebase from "firebase";

import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfTrGBkFhKySWDfKb5hYE2hqAxAj0ipd4",
  authDomain: "scheduler-26512.firebaseapp.com",
  databaseURL: "https://scheduler-26512.firebaseio.com",
  projectId: "scheduler-26512",
  storageBucket: "scheduler-26512.appspot.com",
  messagingSenderId: "898467631067",
  appId: "1:898467631067:web:56224f0ae36de72af8e1fe",
  measurementId: "G-92Y160DBRQ",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
