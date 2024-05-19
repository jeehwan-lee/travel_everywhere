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
import { Reservation } from "../models/reservation";
import { Room } from "../models/room";
import { store } from "./firebase";
import { getHotel } from "./hotel";

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

  const reservationSnapShot = await addDoc(
    collection(store, COLLECTIONS.RESERVATION),
    newReservation
  );

  return reservationSnapShot.id;
}

export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where("userId", "==", userId)
  );

  const reservationSnapshot = await getDocs(reservationQuery);

  const result = [];

  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    };

    const hotel = await getHotel(reservation.hotelId);

    result.push({
      reservation,
      hotel,
    });
  }

  return result;
}

export async function getReservation(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.RESERVATION, id));

  return {
    ...snapshot.data(),
  } as Reservation;
}
