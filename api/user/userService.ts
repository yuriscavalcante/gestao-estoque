import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from '../config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export class UserService {
  async createUser(user: any) {
    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      async (userCredential) => {
        const uid = userCredential.user.uid;
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, {
          name: user.name,
          email: user.email,
          uid: uid,
        });
      }
    );
  }
}