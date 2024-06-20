/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../../styles/colorPalette";
import Flex from "./Flex";
import { Spacing } from "./Spacing";
import Text from "./Text";

function LeftMenubar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname.slice(1);

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
          <Link to="/profile">
            <Text typography="t4" bold={path === "profile" ? true : false}>
              회원정보
            </Text>
          </Link>
          <Spacing size={30} />
          <Link to="/reservation/list">
            <Text
              typography="t4"
              bold={
                path === "reservation/list" || path === "reservation/done"
                  ? true
                  : false
              }
            >
              나의예약
            </Text>
          </Link>
          <Spacing size={30} />
          <Link to="/register/list">
            <Text
              typography="t4"
              bold={
                path === "register/list" || path === "reservation/user/list"
                  ? true
                  : false
              }
            >
              등록한 호텔
            </Text>
          </Link>
          <Spacing size={30} />
          <Link to="/like/list">
            <Text typography="t4" bold={path === "like/list" ? true : false}>
              찜한 호텔
            </Text>
          </Link>
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
