import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcFk13XoshcdVYdxVpKaSDcfX10bwIIrw",
  authDomain: "todo-app-6034b.firebaseapp.com",
  projectId: "todo-app-6034b",
  storageBucket: "todo-app-6034b.firebasestorage.app",
  messagingSenderId: "1052202885046",
  appId: "1:1052202885046:web:83190f963fba80bcd1ab17",
  measurementId: "G-W7KKEHE26V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
