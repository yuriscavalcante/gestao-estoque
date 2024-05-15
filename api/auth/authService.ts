import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config";

export class AuthService {
    async login (login: any) {
      let data: any;
      await signInWithEmailAndPassword(auth, login.email, login.password).then(
        async (userCredential) => {
          const userDocRef = doc(db, "users", userCredential.user.uid);
          const user = (await getDoc(userDocRef)).data();
          data = user;
          typeof window !== 'undefined' ? localStorage.setItem("auth", JSON.stringify(user)) : null;
        }
      );
      return data;
    }
}