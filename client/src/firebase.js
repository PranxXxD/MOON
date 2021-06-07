import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBt7kVruNSQos9R__4vPNbgwhH7EKO_QGQ",
  authDomain: "moonlight-776fd.firebaseapp.com",
  projectId: "moonlight-776fd",
  storageBucket: "moonlight-776fd.appspot.com",
  messagingSenderId: "995136004789",
  appId: "1:995136004789:web:d70bfa7b6944cd023bd4fc",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
