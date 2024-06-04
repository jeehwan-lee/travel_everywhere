import React, { useState } from "react";
import Flex from "../components/shared/Flex";
import { TextField } from "../components/shared/TextField";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import { LoginInfo } from "../models/login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../remote/firebase";
import { SignUpInfo } from "../models/signup";
import { registerUserInfo } from "../remote/user";

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const onChange = (e: { target: { name: any; value: any } }) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      ).then((userCredential) => {
        registerUserInfo({ ...signUpInfo, uid: userCredential.user.uid });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>회원가입</Text>
      <Spacing size={16} />
      <TextField
        label="아이디"
        name="email"
        value={signUpInfo.email}
        onChange={onChange}
      />
      <TextField
        label="비밀번호"
        name="password"
        value={signUpInfo.password}
        onChange={onChange}
      />
      <Button onClick={() => onSubmit()}>회원가입</Button>
    </div>
  );
}

export default SignUp;
