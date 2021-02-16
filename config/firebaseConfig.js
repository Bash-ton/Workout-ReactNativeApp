
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMjd54GKwpWGA-Bdy_TL_nQFTMMqLZDjU",
    authDomain: "workout-reactnative.firebaseapp.com",
    projectId: "workout-reactnative",
    storageBucket: "workout-reactnative.appspot.com",
    messagingSenderId: "86878449098",
    appId: "1:86878449098:web:691aa3fd933845d10c3333",
    measurementId: "G-JB4J2WLENF"
};
if (!firebase.apps.length) {
    //firebase.initializeApp({});

firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true});
}
export default firebase;