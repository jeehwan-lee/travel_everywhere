/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
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
import {
  isValidDisplayName,
  isValidEmail,
  registerUserInfo,
} from "../remote/user";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { colors } from "../styles/colorPalette";
import { Input2 } from "../components/shared/Input2";
import { TextField2 } from "../components/shared/TextField2";

function SignUp() {
  const expEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const expPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const expDisplayName = /^[A-Za-z]{4,8}$/;

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    passwordCheck: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const [signUpErrorMessage, setSignUpErrorMessage] = useState<SignUpInfo>({
    email: "",
    password: "",
    passwordCheck: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const emailCheck = () => {
    isValidEmail(signUpInfo.email).then((data) => {
      if (data) {
        alert("이미 존재하는 이메일입니다");
        setSignUpInfo({ ...signUpInfo, email: "" });
      } else {
        alert("사용 가능한 이메일입니다");
      }
    });
  };

  const displayNameCheck = () => {
    isValidDisplayName(signUpInfo.displayName).then((data) => {
      if (data) {
        alert("이미 존재하는 닉네임입니다");
        setSignUpInfo({ ...signUpInfo, displayName: "" });
      } else {
        alert("사용 가능한 닉네임입니다");
      }
    });
  };

  const isValidSignUpInfo = () => {
    let isValid = true;
    let newSignUpErrorMessage = { ...signUpErrorMessage };

    if (expEmail.test(signUpInfo.email) === false) {
      newSignUpErrorMessage.email = "이메일 형식을 확인하세요";
      isValid = false;
    } else {
      newSignUpErrorMessage.email = "";
    }

    if (expPassword.test(signUpInfo.password) === false) {
      newSignUpErrorMessage.password =
        "비밀번호는 문자, 숫자, 특수문자 포함해서 8자리 이상입니다";
      isValid = false;
    } else {
      newSignUpErrorMessage.password = "";
    }

    if (signUpInfo.password !== signUpInfo.passwordCheck) {
      newSignUpErrorMessage.passwordCheck = "비밀번호가 일치하지 않습니다";
      isValid = false;
    } else {
      newSignUpErrorMessage.passwordCheck = "";
    }

    if (expDisplayName.test(signUpInfo.displayName) === false) {
      newSignUpErrorMessage.displayName = "닉네임은 4자이상 8자이하입니다";
      isValid = false;
    } else {
      newSignUpErrorMessage.displayName = "";
    }

    setSignUpErrorMessage(newSignUpErrorMessage);

    return isValid;
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!isValidSignUpInfo()) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      ).then((userCredential) => {
        registerUserInfo({ ...signUpInfo, uid: userCredential.user.uid });
      });

      alert("가입되었습니다");

      setSignUpInfo({
        email: "",
        password: "",
        passwordCheck: "",
        uid: "",
        displayName: "",
        photoURL: "",
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
        <Flex css={textFieldWithButtonStyles}>
          <TextField2
            label="이메일"
            name="email"
            value={signUpInfo.email}
            onChange={onChange}
            placeholder="이메일을 입력해주세요"
            helpMessage={signUpErrorMessage.email}
            hasError={signUpErrorMessage.email !== ""}
          />
          <Button css={textFieldButtonStyle} onClick={emailCheck}>
            중복확인
          </Button>
        </Flex>
        <Spacing size={20} />
        <TextField2
          label="비밀번호"
          name="password"
          value={signUpInfo.password}
          onChange={onChange}
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8자리 이상)"
          type="password"
          helpMessage={signUpErrorMessage.password}
          hasError={signUpErrorMessage.password !== ""}
        />
        <Spacing size={20} />
        <TextField2
          label="비밀번호 확인"
          name="passwordCheck"
          value={signUpInfo.passwordCheck}
          onChange={onChange}
          placeholder="비밀번호를 재입력하세요"
          type="password"
          helpMessage={signUpErrorMessage.passwordCheck}
          hasError={signUpErrorMessage.passwordCheck !== ""}
        />
        <Spacing size={20} />
        <Flex css={textFieldWithButtonStyles}>
          <TextField2
            label="닉네임"
            name="displayName"
            value={signUpInfo.displayName}
            onChange={onChange}
            placeholder="닉네임을 입력 (4자이상 8자이하)"
            helpMessage={signUpErrorMessage.displayName}
            hasError={signUpErrorMessage.displayName !== ""}
          />
          <Button css={textFieldButtonStyle} onClick={displayNameCheck}>
            중복확인
          </Button>
        </Flex>
        <Spacing size={30} />
        <Button css={buttonStyles} onClick={() => onSubmit()}>
          가입하기
        </Button>
        <Spacing size={20} />
        <Flex justify="space-between" css={textStyles}>
          <Text color="gray500">기존에 계정이 있으신가요?</Text>
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

const textFieldWithButtonStyles = css`
  position: relative;
  width: 400px;
`;

const textFieldButtonStyle = css`
  position: absolute;
  height: 30px;
  top: 44px;
  right: 12px;
`;

export default SignUp;
