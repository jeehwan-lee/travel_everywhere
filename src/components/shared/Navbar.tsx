/** @jsxImportSource @emotion/react */

import { Link, useLocation, useNavigate } from "react-router-dom";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "../../styles/colorPalette";
import { useCallback, useEffect, useState } from "react";
import useUser from "../../hooks/auth/userUser";
import { Spacing } from "./Spacing";
import useGoogleSignin from "../../hooks/useGoogleSignin";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import Text from "./Text";
import { Input } from "./Input";
import SearchInput from "./SearchInput";
import { FaHome } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();

  const [showDropDownMenu, setShowDropDownMenu] = useState<Boolean>(false);

  const profileClick = () => {
    setShowDropDownMenu((prev) => !prev);
  };

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <>
          <Flex justify="center" align="center">
            <Spacing size={8} direction="horizontal" />
            <Flex align="center" onClick={profileClick} css={profileStyles}>
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
              <Spacing size={10} direction="horizontal" />
              <Text typography="t6">{user.displayName}님</Text>
              <Spacing size={4} direction="horizontal" />
              {showDropDownMenu ? (
                <>
                  <FaCaretUp size={18} />
                  <Flex css={dropDownStyles} direction="column">
                    <Text
                      typography="t5"
                      css={dropDownTextStyles}
                      onClick={() => navigate("/register/Hotel")}
                    >
                      호텔 등록하기
                    </Text>
                    <Spacing size={6} />
                    <Text
                      typography="t5"
                      css={dropDownTextStyles}
                      onClick={() => navigate("/profile")}
                    >
                      마이페이지
                    </Text>
                    <Spacing size={6} />
                    <Text
                      typography="t5"
                      css={dropDownTextStyles}
                      onClick={() => {
                        signOut(auth);
                      }}
                    >
                      로그아웃
                    </Text>
                  </Flex>
                </>
              ) : (
                <>
                  <FaCaretDown size={18} />
                </>
              )}
            </Flex>
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
  }, [user, showDropDownMenu]);

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
  border-bottom: 1px solid ${colors.gray200};
`;

const navbarStyles = css`
  max-width: 1060px;
  margin: 0 auto;
`;

const buttonStyles = css`
  font-size: 14px;
  padding: 10px 20px;
`;

const profileStyles = css`
  position: relative;
  cursor: pointer;
`;

const dropDownStyles = css`
  position: absolute;
  top: 50px;
  border: 1px solid ${colors.gray200};
  border-radius: 4px;
  width: 180px;
  background-color: ${colors.white};
  padding: 10px 20px;
  z-index: 999;
  cursor: default;
`;

const dropDownTextStyles = css`
  cursor: pointer;

  &:hover {
    font-size: 18px;
    font-weight: bold;
  }
`;

export default Navbar;
