import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTUNBE9jbkyP2-DfPIoub0enldpsmfP1o",
  authDomain: "live-chat-425bb.firebaseapp.com",
  projectId: "live-chat-425bb",
  storageBucket: "live-chat-425bb.appspot.com",
  messagingSenderId: "535084739164",
  appId: "1:535084739164:web:823032ff33aafc1a4cd499",
  measurementId: "G-T6MZ4CPRZZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
