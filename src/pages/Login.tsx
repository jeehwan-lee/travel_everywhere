/** @jsxImportSource @emotion/react */

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
import { Input2 } from "../components/shared/Input2";
import { css } from "@emotion/react";
import { colors } from "../styles/colorPalette";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();

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

      navigate("/");
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
            로그인
          </Text>
        </Flex>
        <Spacing size={20} />
        <Input2
          name="id"
          value={loginInfo.id}
          onChange={onChange}
          placeholder="이메일"
        />
        <Spacing size={20} />
        <Input2
          name="password"
          value={loginInfo.password}
          onChange={onChange}
          placeholder="비밀번호"
          type="password"
        />
        <Spacing size={20} />
        <Button css={buttonStyles} onClick={() => onSubmit()}>
          로그인
        </Button>
        <Spacing size={20} />
        <Flex justify="space-between" css={textStyles}>
          <Text color="gray500">아직 계정이 없으신가요?</Text>
          <Link to="/signUp">
            <Text color="gray900">회원가입</Text>
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

export default Login;
