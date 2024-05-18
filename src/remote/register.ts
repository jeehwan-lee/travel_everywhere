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
import { HotelRegister, RoomRegister } from "../models/register";
import { store } from "./firebase";

export async function registerHotel(newRegister: HotelRegister) {
  const registerHotel = await addDoc(
    collection(store, COLLECTIONS.HOTEL),
    newRegister
  );
  return registerHotel.id;
}

export async function registerRoom(newRegister: RoomRegister, hotelId: string) {
  const hotel = await doc(store, COLLECTIONS.HOTEL, hotelId);
  const roomRef = await doc(collection(hotel, COLLECTIONS.ROOM));

  return setDoc(roomRef, newRegister);
}
