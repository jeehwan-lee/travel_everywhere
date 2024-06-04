import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "../constants";
import { User } from "../models/user";

export async function getUserInfo(uid: string) {
  const snapshot = await getDocs(
    query(collection(store, COLLECTIONS.USER), where("uid", "==", uid))
  );

  return snapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      } as User)
  )[0];
}

export async function registerUserInfo(newUser: User) {
  const registerUserInfo = await addDoc(
    collection(store, COLLECTIONS.USER),
    newUser
  );
  return registerUserInfo.id;
}
