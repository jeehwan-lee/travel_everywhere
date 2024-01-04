import { useQuery } from "react-query";
import useUser from "../../../hooks/auth/userUser";
import { getReservations } from "../../../remote/reservation";

export default function useReservationList() {
  const user = useUser();

  const { data, isLoading } = useQuery(
    ["reservations", user?.uid],
    () => getReservations({ userId: user?.uid as string }),
    {
      enabled: user != null,
    }
  );

  return { data, isLoading };
}
