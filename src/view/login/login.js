import { auth } from "../../components/firebaseconf";
import {  signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";



 async function login( email, password) {
  const a =await signInWithEmailAndPassword(auth, email, password)
  /*kullanıcıya ait bilgiler içinde */

  console.log(a);
  return a
    }


    export { login}