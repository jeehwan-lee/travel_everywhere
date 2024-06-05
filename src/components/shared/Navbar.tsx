/** @jsxImportSource @emotion/react */

import { Link, useLocation, useNavigate } from "react-router-dom";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "../../styles/colorPalette";
import { useCallback } from "react";
import useUser from "../../hooks/auth/userUser";
import { Spacing } from "./Spacing";
import useGoogleSignin from "../../hooks/useGoogleSignin";
import { signOut } from "firebase/auth";
import { auth } from "../../remote/firebase";
import Text from "./Text";
import { Input } from "./Input";
import SearchInput from "./SearchInput";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Flex justify="center" align="center">
            <Button onClick={() => navigate("/register/Hotel")}>
              등록하기
            </Button>
            <Button
              onClick={() => {
                signOut(auth);
              }}
            >
              로그아웃
            </Button>
            <Spacing size={8} direction="horizontal" />
            <Text>{user.displayName}</Text>
            <Link to="/settings">
              <img
                src={
                  user.photoURL ??
                  "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-64.png"
                }
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: "100%" }}
              />
            </Link>
            <Spacing size={8} direction="horizontal" />
          </Flex>
        </>
      );
    }

    return (
      <Link to="/signin">
        <Button css={buttonStyles}>로그인 및 회원가입</Button>
      </Link>
    );
  }, [user]);
  return (
    <div css={headerStyles}>
      <Flex direction="column" css={navbarStyles}>
        <Flex justify="space-between" align="center">
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Flex align="center">
                <Text bold={true} typography="t1">
                  Travel
                </Text>
              </Flex>
            </Link>
            <Spacing size={20} direction="horizontal" />
            <SearchInput placeholder="호텔을 검색해보세요" />
          </Flex>
          {renderButton()}
        </Flex>
      </Flex>
    </div>
  );
}

const headerStyles = css`
  padding: 20px 0px;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`;

const navbarStyles = css`
  max-width: 1060px;
  margin: 0 auto;
`;

const buttonStyles = css`
  font-size: 14px;
  padding: 10px 20px;
`;

export default Navbar;
