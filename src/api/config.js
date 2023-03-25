import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmRy0xTqe1F9nDH9Y3Te6NpGbFzk9JRYs",
  authDomain: "tcl-59-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-59-smart-shopping-list",
  storageBucket: "tcl-59-smart-shopping-list.appspot.com",
  messagingSenderId: "399183979222",
  appId: "1:399183979222:web:32f16fc63b0faf10309f77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
