import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSkN-3sYChrwF0htp6WEXYmF4qsx3Wfdg",
  authDomain: "gestao-estoque-6ded6.firebaseapp.com",
  projectId: "gestao-estoque-6ded6",
  storageBucket: "gestao-estoque-6ded6.appspot.com",
  messagingSenderId: "796444987758",
  appId: "1:796444987758:web:5ba4945b1a8e5bae31f17f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;