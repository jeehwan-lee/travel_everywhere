import { useQuery } from "react-query";
import { getHotelWithRoom } from "../../../remote/hotel";

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const { data } = useQuery(["hotelWithRoom", hotelId, roomId], () =>
    getHotelWithRoom({ hotelId, roomId })
  );

  return { data };
}

export default useReservation;
