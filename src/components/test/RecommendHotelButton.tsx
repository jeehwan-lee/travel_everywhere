import { collection, getDocs, writeBatch } from "firebase/firestore";
import { COLLECTIONS } from "../../constants";
import { store } from "../../remote/firebase";
import Button from "../shared/Button";

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store);
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL));

    snapshot.docs.forEach((hotel) => {
      const recommend = [];

      for (let doc of snapshot.docs) {
        if (recommend.length === 5) {
          break;
        }

        if (doc.id !== hotel.id) {
          recommend.push(doc.id);
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: recommend,
      });
    });

    await batch.commit();
  };
  return <Button onClick={handleButtonClick}>추천호텔 추가</Button>;
}

export default RecommendHotelButton;
