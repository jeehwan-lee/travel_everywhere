import { useQuery } from "react-query";
import { getRooms } from "../../../remote/room";

function useRooms({ hotelId }: { hotelId: string }) {
  return useQuery(["rooms", hotelId], () => getRooms(hotelId));
}

export default useRooms;
