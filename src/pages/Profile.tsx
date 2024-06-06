/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { TextField2 } from "../components/shared/TextField2";
import useUser from "../hooks/auth/userUser";
import { colors } from "../styles/colorPalette";

function Profile() {
  const user = useUser();

  if (user != null) {
    return (
      <>
        <Flex direction="column" align="center" css={containerStyles}>
          <Spacing size={40} />
          <Flex align="center" direction="column">
            <img
              src={
                user.photoURL ??
                "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-64.png"
              }
              alt=""
              width={100}
              height={100}
              style={{ borderRadius: "100%", cursor: "pointer" }}
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
            />
            <Button css={textFieldButtonStyle}>중복확인</Button>
          </Flex>
          <Spacing size={20} />
          <TextField2
            label="비밀번호"
            name="password"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8자리 이상)"
            type="password"
          />
          <Spacing size={20} />
          <TextField2
            label="비밀번호 확인"
            name="passwordCheck"
            placeholder="비밀번호를 재입력하세요"
            type="password"
          />
          <Spacing size={30} />
          <Button css={buttonStyles}>수정하기</Button>
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
