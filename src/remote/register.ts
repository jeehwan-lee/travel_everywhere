import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { Hotel } from "../models/hotel";
import { RegisterHotel } from "../models/register";
import { store } from "./firebase";

export async function registerHotel(newRegister: RegisterHotel) {
  await setDoc(doc(collection(store, COLLECTIONS.HOTEL)), newRegister);
}
