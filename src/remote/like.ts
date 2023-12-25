import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { Like } from "../models/like";
import { store } from "./firebase";

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where("userId", "==", userId),
      orderBy("order", "asc")
    )
  );

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Like)
  );
}
