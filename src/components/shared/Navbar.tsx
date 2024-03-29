/** @jsxImportSource @emotion/react */

import { Link, useLocation } from "react-router-dom";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "../../styles/colorPalette";
import { useCallback } from "react";
import useUser from "../../hooks/auth/userUser";
import { Spacing } from "./Spacing";

function Navbar() {
  const location = useLocation();
  const user = useUser();

  const showSignButton =
    ["/signup", "/signin"].includes(location.pathname) == false;

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Flex justify="center" align="center">
            <Link to="/my">
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
            <Link to="/settings">
              <img
                src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/setting-64.png"
                alt=""
                width={50}
                height={50}
              />
            </Link>
          </Flex>
        </>
      );
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`;

export default Navbar;
