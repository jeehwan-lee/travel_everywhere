import {
  addDoc,
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
import { HotelRegister } from "../models/register";
import { store } from "./firebase";

export async function registerHotel(newRegister: HotelRegister) {
  return await addDoc(collection(store, COLLECTIONS.HOTEL), newRegister);
}
