import React, { useState } from "react";
import Flex from "../components/shared/Flex";
import { TextField } from "../components/shared/TextField";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import { LoginInfo } from "../models/login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../remote/firebase";
import { getUserInfo } from "../remote/user";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";

function Login() {
  const setUser = useSetRecoilState(userAtom);

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    id: "",
    password: "",
  });

  const onChange = (e: { target: { name: any; value: any } }) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        loginInfo.id,
        loginInfo.password
      );

      const userInfo = await getUserInfo(loginUser.user.uid);

      setUser({
        uid: userInfo.uid,
        email: userInfo?.email ?? "",
        displayName: userInfo?.displayName ?? "",
        photoURL: userInfo.photoURL ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>로그인</Text>
      <Spacing size={16} />
      <TextField
        label="아이디"
        name="id"
        value={loginInfo.id}
        onChange={onChange}
      />
      <TextField
        label="비밀번호"
        name="password"
        value={loginInfo.password}
        onChange={onChange}
      />
      <Button onClick={() => onSubmit()}>로그인</Button>
    </div>
  );
}

export default Login;
