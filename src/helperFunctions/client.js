import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBl7153mvyfsFiPSkmrfvwwpr_YrdyrFxE",
  authDomain: "kanban-board-spa.firebaseapp.com",
  databaseURL: "https://kanban-board-spa.firebaseio.com",
  projectId: "kanban-board-spa",
  storageBucket: "",
  messagingSenderId: "687381495033"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();

export const auth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();
