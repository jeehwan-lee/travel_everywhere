import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { COLLECTIONS } from "../constants";
import { Hotel } from "../models/hotel";
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

export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, "name" | "id" | "likes">;
  userId: string;
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where("userId", "==", userId),
      where("hotelId", "==", hotel.id)
    )
  );

  if (findSnapshot.docs.length > 0) {
    const removeTarget = findSnapshot.docs[0];
    const removeTargetOrder = removeTarget.data().order;

    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where("userId", "==", userId),
        where("order", ">", removeTargetOrder)
      )
    );

    await updateDoc(doc(store, COLLECTIONS.HOTEL, hotel.id), {
      likes: (hotel.likes as number) - 1,
    });

    if (updateTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref);
    } else {
      const batch = writeBatch(store);

      updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 });
      });

      await batch.commit();

      return deleteDoc(removeTarget.ref);
    }
  } else {
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where("userId", "==", userId),
        orderBy("order", "desc"),
        limit(1)
      )
    );

    await updateDoc(doc(store, COLLECTIONS.HOTEL, hotel.id), {
      likes: (hotel.likes as number) + 1,
    });

    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order;

    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      userId,
    };

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike);
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store);

  likes.forEach((like, index) => {
    batch.update(doc(collection(store, COLLECTIONS.LIKE), like.id), {
      order: like.order,
    });
  });

  return batch.commit();
}

export async function removeLike(hotelId: string, userId: string) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where("userId", "==", userId),
      where("hotelId", "==", hotelId)
    )
  );

  return deleteDoc(findSnapshot.docs[0].ref);
}
