/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { updatePassword } from "firebase/auth";
import React, { useState } from "react";
import ProfileImageUpload from "../components/profile/ProfileImageUpload";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { TextField2 } from "../components/shared/TextField2";
import useUser from "../hooks/auth/userUser";
import { SignUpInfo } from "../models/signup";
import { auth } from "../remote/firebase";
import { isValidDisplayName, modifyUserInfo } from "../remote/user";
import { colors } from "../styles/colorPalette";

function Profile() {
  const user = useUser();

  const expPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const expDisplayName = /^[A-Za-z]{4,8}$/;

  const [profileInfo, setProfileInfo] = useState<SignUpInfo>({
    email: user?.email as string,
    password: "",
    passwordCheck: "",
    uid: user?.uid as string,
    displayName: user?.displayName as string,
    photoURL: user?.photoURL || "",
  });

  const [profileErrorMessage, setProfileUpErrorMessage] = useState<SignUpInfo>({
    email: "",
    password: "",
    passwordCheck: "",
    uid: "",
    displayName: "",
    photoURL: "",
  });

  const [displayNameCheck, setDisplayNameCheck] =
    useState<string>("닉네임 중복확인을 해주세요");

  const displayNameExistCheck = () => {
    isValidDisplayName(profileInfo.displayName).then((data) => {
      if (data) {
        alert("이미 존재하는 닉네임입니다");
        setProfileInfo({ ...profileInfo, displayName: "" });
      } else {
        alert("사용 가능한 닉네임입니다");
        setDisplayNameCheck("");
      }
    });
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const isValidProfileInfo = () => {
    let isValid = true;
    let newProfileErrorMessage = { ...profileInfo };

    if (expPassword.test(profileInfo.password) === false) {
      newProfileErrorMessage.password =
        "비밀번호는 문자, 숫자, 특수문자 포함해서 8자리 이상입니다";
      isValid = false;
    } else {
      newProfileErrorMessage.password = "";
    }

    if (profileInfo.password !== profileInfo.passwordCheck) {
      newProfileErrorMessage.passwordCheck = "비밀번호가 일치하지 않습니다";
      isValid = false;
    } else {
      newProfileErrorMessage.passwordCheck = "";
    }

    if (expDisplayName.test(profileInfo.displayName) === false) {
      newProfileErrorMessage.displayName = "닉네임은 4자이상 8자이하입니다";
      isValid = false;
    } else {
      newProfileErrorMessage.displayName = "";
    }

    setProfileUpErrorMessage(newProfileErrorMessage);

    return isValid;
  };

  const onSubmit = async () => {
    if (!auth.currentUser) {
      return;
    }

    if (!isValidProfileInfo()) {
      return;
    }

    if (displayNameCheck !== "") {
      alert(displayNameCheck);
      return;
    }

    try {
      await modifyUserInfo(
        profileInfo.displayName,
        profileInfo.photoURL as string,
        profileInfo.uid
      );

      await updatePassword(auth.currentUser, profileInfo.password);

      alert("수정되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  if (user != null) {
    return (
      <>
        <Flex direction="column" align="center" css={containerStyles}>
          <Spacing size={40} />
          <Flex align="center" direction="column">
            <ProfileImageUpload
              imageUrl={profileInfo.photoURL}
              onChangeFile={(url) =>
                setProfileInfo({ ...profileInfo, photoURL: url })
              }
            />
            <Spacing size={14} />
            <Text typography="t4" bold={true}>
              {user.displayName}
            </Text>
            <Spacing size={8} />
            <Text typography="t6">{user.email}</Text>
          </Flex>
          <Spacing size={20} />
          <Flex css={textFieldWithButtonStyles}>
            <TextField2
              label="닉네임"
              name="displayName"
              placeholder="닉네임을 입력 (4자이상 8자이하)"
              onChange={onChange}
              helpMessage={profileErrorMessage.displayName}
              hasError={profileErrorMessage.displayName !== ""}
            />
            <Button css={textFieldButtonStyle} onClick={displayNameExistCheck}>
              중복확인
            </Button>
          </Flex>
          <Spacing size={20} />
          <TextField2
            label="비밀번호"
            name="password"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8자리 이상)"
            type="password"
            onChange={onChange}
            helpMessage={profileErrorMessage.password}
            hasError={profileErrorMessage.password !== ""}
          />
          <Spacing size={20} />
          <TextField2
            label="비밀번호 확인"
            name="passwordCheck"
            placeholder="비밀번호를 재입력하세요"
            type="password"
            onChange={onChange}
            helpMessage={profileErrorMessage.passwordCheck}
            hasError={profileErrorMessage.passwordCheck !== ""}
          />
          <Spacing size={30} />
          <Button css={buttonStyles} onClick={() => onSubmit()}>
            수정하기
          </Button>
          <Spacing size={20} />
        </Flex>
      </>
    );
  } else {
    return <>hello</>;
  }
}

const containerStyles = css`
  width: 600px;
  margin: 0 auto;
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
export default Profile;
