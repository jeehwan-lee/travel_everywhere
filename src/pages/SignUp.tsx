/** @jsxImportSource @emotion/react */

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
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { colors } from "../styles/colorPalette";
import { Input2 } from "../components/shared/Input2";
import { TextField2 } from "../components/shared/TextField2";

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
    <>
      <Spacing size={100} />
      <Flex direction="column" align="center" css={containerStyles}>
        <Spacing size={40} />
        <Flex justify="space-between" align="center" css={textStyles}>
          <Text bold={true} typography="t1" color="gray900">
            회원가입
          </Text>
        </Flex>
        <Spacing size={20} />
        <TextField2
          label="이메일"
          name="id"
          value={signUpInfo.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
        />
        <Spacing size={20} />
        <TextField2
          label="비밀번호"
          name="password"
          value={signUpInfo.password}
          onChange={onChange}
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자리)"
          type="password"
        />
        <Spacing size={20} />
        <TextField2
          label="비밀번호 확인"
          name="password"
          value={signUpInfo.password}
          onChange={onChange}
          placeholder="비밀번호 재입력"
          type="password"
        />
        <Spacing size={20} />
        <TextField2
          label="닉네임"
          name="displayName"
          value={signUpInfo.displayName}
          onChange={onChange}
          placeholder="닉네임을 입력하세요"
        />
        <Spacing size={30} />
        <Button css={buttonStyles} onClick={() => onSubmit()}>
          가입하기
        </Button>
        <Spacing size={20} />
        <Flex justify="flex-end" css={textStyles}>
          <Link to="/signin">
            <Text color="gray900">로그인</Text>
          </Link>
        </Flex>
        <Spacing size={40} />
      </Flex>
    </>
  );
}

const containerStyles = css`
  width: 600px;
  margin: 0 auto;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
`;

const textStyles = css`
  width: 400px;
`;

const buttonStyles = css`
  width: 400px;
  font-size: 18px;
`;

export default SignUp;
