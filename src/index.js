import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

require('firebase/firestore');

firebase.initializeApp( {
  apiKey: "AIzaSyDtFTNgfHYSjyCfpg21JR5nfCc8WX80qfo",
  authDomain: "evernote-clone-3cb56.firebaseapp.com",
  databaseURL: "https://evernote-clone-3cb56.firebaseio.com",
  projectId: "evernote-clone-3cb56",
  storageBucket: "evernote-clone-3cb56.appspot.com",
  messagingSenderId: "610503885789",
  appId: "1:610503885789:web:023f3271a17991627eec34",
  measurementId: "G-VR07L93KYN"
} );
firebase.analytics();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
