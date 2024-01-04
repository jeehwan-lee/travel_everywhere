import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { Reservation } from "../models/reservation";
import { Room } from "../models/room";
import { store } from "./firebase";

export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId);
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId)
  );

  const room = roomSnapshot.data() as Room;
  const availableRoomCount = room.avaliableCount;

  if (availableRoomCount === 0) {
    throw new Error("no room");
  }

  await updateDoc(roomSnapshot.ref, {
    avaliableCount: availableRoomCount - 1,
  });

  await setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation);
}
