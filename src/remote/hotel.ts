import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { Hotel } from "../models/hotel";
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

  const items = hotelsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

  return { items, lastVisible };
}
