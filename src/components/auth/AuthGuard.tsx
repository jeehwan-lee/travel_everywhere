import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../remote/firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = useSetRecoilState(userAtom);

  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user == null) {
      setUser(null);
    } else {
      setUser({
        uid: user.uid,
        email: user?.email ?? "",
        displayName: user?.displayName ?? "",
        photoURL: user.photoURL ?? "",
      });
    }

    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }
  return <div>{children}</div>;
}

export default AuthGuard;
