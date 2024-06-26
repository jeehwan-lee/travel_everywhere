import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import useUser from "../hooks/auth/userUser";
import { Hotel } from "../models/hotel";
import { Room } from "../models/room";
import { store } from "./firebase";

export async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const hotelsQuery =
    pageParams == null
      ? await query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : await query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10)
        );

  const hotelsSnapshot = await getDocs(hotelsQuery);

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

  return { items, lastVisible };
}

export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id));

  return {
    id,
    ...snapshot.data(),
  } as Hotel;
}

export async function getRecommendHotels(hotelsId: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    where(documentId(), "in", hotelsId)
  );

  const snapshot = await getDocs(recommendQuery);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );
}

export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId));
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId)
  );

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  };
}

export function removeHotel(hotelId: string) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);

  return deleteDoc(hotelRef);
}
