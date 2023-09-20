// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6MQ8SGxz3Wb3b3Aw_Uf6zhKw_be3ciiI",
  authDomain: "blogs-app-d3bef.firebaseapp.com",
  projectId: "blogs-app-d3bef",
  storageBucket: "blogs-app-d3bef.appspot.com",
  messagingSenderId: "176030401769",
  appId: "1:176030401769:web:f0a1be3d9781d960061c78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
