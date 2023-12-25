import { useQuery } from "react-query";
import { getLikes } from "../remote/like";
import useUser from "./auth/userUser";

function useLike() {
  const user = useUser();
  const { data } = useQuery(
    ["likes"],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    }
  );

  return data;
}

export default useLike;
