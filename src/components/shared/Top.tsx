/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import Flex from "./Flex";
import { Spacing } from "./Spacing";
import Text from "./Text";
import { SlOptions } from "react-icons/sl";
import { SlOptionsVertical } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { colors } from "../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/auth/userUser";

interface TopProps {
  title: string;
  subTitle: string;
  id: string;
  userId?: string;
}

function Top({ title, subTitle, id, userId }: TopProps) {
  const navigate = useNavigate();

  const user = useUser();

  const [showDropDownMenu, setShowDropDownMenu] = useState<Boolean>(false);

  const editButtonClick = () => {
    setShowDropDownMenu((prev) => !prev);
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      css={ContainerStyles}
      align="center"
    >
      <Flex direction="column">
        <Text bold={true} typography="t4">
          {title}
        </Text>
        <Spacing size={4} />
        <Text typography="t7">{subTitle}</Text>
      </Flex>
      {user && user.uid === userId ? (
        <Flex css={editButtonStyles}>
          <BsThreeDotsVertical
            size={26}
            color={colors.gray700}
            onClick={editButtonClick}
          />
          {showDropDownMenu && (
            <Flex css={dropDownStyles} direction="column">
              <Text
                typography="t5"
                css={dropDownTextStyles}
                onClick={() => navigate(`/register/Room?hotelId=${id}`)}
              >
                객실 등록하기
              </Text>
              <Spacing size={6} />
              <Text
                typography="t5"
                css={dropDownTextStyles}
                onClick={() => navigate("/profile")}
              >
                수정하기
              </Text>
              <Spacing size={6} />
              <Text
                typography="t5"
                css={dropDownTextStyles}
                onClick={() => navigate("/")}
              >
                삭제하기
              </Text>
            </Flex>
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
}

const ContainerStyles = css`
  padding: 24px;
`;

const editButtonStyles = css`
  position: relative;
  cursor: pointer;
`;

const dropDownStyles = css`
  position: absolute;
  top: 40px;
  right: -24px;
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

export default Top;
