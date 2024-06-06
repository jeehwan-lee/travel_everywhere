/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { colors } from "../../styles/colorPalette";
import Flex from "./Flex";
import { Spacing } from "./Spacing";
import Text from "./Text";

function LeftMenubar({ children }: { children: React.ReactNode }) {
  return (
    <Flex>
      <Flex
        justify="space-between"
        direction="column"
        css={profileMenuBarStyles}
      >
        <Flex direction="column">
          <Spacing size={20} />
          <Text typography="t1" bold={true}>
            마이페이지
          </Text>
          <Spacing size={30} />
          <Text typography="t4">회원정보</Text>
          <Spacing size={30} />
          <Text typography="t4">예약내역</Text>
          <Spacing size={30} />
          <Text typography="t4">등록한 호텔</Text>
        </Flex>
        <Flex direction="column">
          <Text typography="t4">로그아웃</Text>
          <Spacing size={20} />
        </Flex>
      </Flex>
      <Flex css={profileBodyStyles}>{children}</Flex>
    </Flex>
  );
}

const profileMenuBarStyles = css`
  padding: 10px 20px;
  height: 800px;
  flex: 1;
  background-color: ${colors.gray50};
`;

const profileBodyStyles = css`
  background-color: white;
  flex: 4;
`;

export default LeftMenubar;
