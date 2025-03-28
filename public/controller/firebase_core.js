import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAVZUpVtRZp541zZslpWlTzjsurbVeC8wc",
  authDomain: "ynagella-cmsc5373-webapp.firebaseapp.com",
  projectId: "ynagella-cmsc5373-webapp",
  storageBucket: "ynagella-cmsc5373-webapp.appspot.com",
  messagingSenderId: "1034233104503",
  appId: "1:1034233104503:web:05012238e256dedcca1e72",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
