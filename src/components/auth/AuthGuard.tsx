import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth, store } from "../../remote/firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";
import { getUserInfo } from "../../remote/user";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = useSetRecoilState(userAtom);

  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user == null) {
      setUser(null);
    }

    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }
  return <div>{children}</div>;
}

export default AuthGuard;
