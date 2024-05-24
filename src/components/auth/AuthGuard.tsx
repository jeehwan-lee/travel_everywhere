import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth, store } from "../../remote/firebase";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { COLLECTIONS } from "../../constants";
import { getUserInfo } from "../../remote/user";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = useSetRecoilState(userAtom);

  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user == null) {
      setUser(null);
    } else {
      const userInfo = await getUserInfo(user.uid);

      setUser({
        uid: userInfo.uid,
        email: userInfo?.email ?? "",
        displayName: userInfo?.displayName ?? "",
        photoURL: userInfo.photoURL ?? "",
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
