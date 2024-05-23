import { useQuery } from "react-query";
import useUser from "../../../hooks/auth/userUser";
import { getRegisterHotelList } from "../../../remote/register";

export default function useRegisterHotelList() {
  const user = useUser();

  const { data, isLoading } = useQuery(
    ["registerList", user?.uid],
    () => getRegisterHotelList(user?.uid as string),
    {
      enabled: user != null,
    }
  );

  return { data, isLoading };
}
