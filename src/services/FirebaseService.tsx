// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { doc, setDoc, getFirestore, collection, where, query, QueryConstraint, getDocs } from "firebase/firestore"

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGHsCxjf56YOUemobMNmadwIJArg8LZ8Y",
  authDomain: "warlock-companion.firebaseapp.com",
  projectId: "warlock-companion",
  storageBucket: "warlock-companion.appspot.com",
  messagingSenderId: "162739523116",
  appId: "1:162739523116:web:3092f99ac88d979e8b8b89",
  measurementId: "G-WM6VW2PGRJ"
};
class FirebaseService {    
  public app = initializeApp(firebaseConfig);
  //initilizeFirebase = () => {
    // Initialize Firebase

    //const analytics = getAnalytics(app);
    // GoogleSignin.configure({
    //   webClientId: '162739523116-3coq25o5pg5aiisofdd7kik7k6ve4uqu.apps.googleusercontent.com',
    // });    
  //}
  public auth = getAuth();
  public provider = new GoogleAuthProvider();
  public GoogleAuthProvider = GoogleAuthProvider;
  signInWithPopup = () => {
    return signInWithPopup(this.auth, this.provider);
  }
  signOut = () => {
    return signOut(this.auth);
  }
  getFirestore = () => {
    return getFirestore();
  }
  getData = (table: string, constraint: QueryConstraint[]) => {
    const db = this.getFirestore();
    const ref = collection(db, table);
    const q = query(ref, ...constraint);
    return getDocs(q);
  }
  saveToDatabase = (userId: string, table: string, params: string, data: Object) => {
    const db = this.getFirestore();
    setDoc(doc(db, table, params), {...data, userId: userId})
  }
}
export default new FirebaseService;