/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { addDelimiter } from "../utils/addDelimiter";
import { Link, useNavigate } from "react-router-dom";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import { colors } from "../styles/colorPalette";
import { MdChevronRight } from "react-icons/md";
import useRegisterHotelList from "../components/register/hooks/useRegisterHotelList";
import { Spacing } from "../components/shared/Spacing";
import Button from "../components/shared/Button";

function RegisterHotelList() {
  const navigate = useNavigate();

  const { data, isLoading } = useRegisterHotelList();

  if (data == null || isLoading == true) {
    return null;
  }

  return (
    <Flex direction="column" css={containerStyles}>
      <Spacing size={20} />
      {data.items.map((hotel) => (
        <Flex css={itemStyles}>
          <Link to={`/hotel/${hotel.id}`} style={{ width: "100%" }}>
            <Flex>
              <img
                css={imageStyles}
                src={hotel.images[0]}
                alt={`${hotel.name} 이미지`}
                width={100}
                height={100}
              />
              <Spacing size={20} direction="horizontal" />
              <Flex direction="column">
                <Text bold={true} typography="t4">
                  {hotel.name}
                </Text>
                <Spacing size={10} />
                <Text typography="t6" bold={true}>
                  {addDelimiter(hotel.price)}원
                </Text>
              </Flex>
            </Flex>
            <Flex justify="flex-end" align="center">
              <Text color="gray600">상세보기</Text>
              <MdChevronRight color={colors.gray500} />
            </Flex>
            <Spacing size={20} />
            <Flex justify="space-between">
              <Button
                css={buttonStyles}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/reservation/user/list");
                }}
              >
                예약내역
              </Button>
              <Spacing size={40} direction="horizontal" />
              <Button
                css={buttonStyles}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/register/Room?hotelId=${hotel.id}`);
                }}
              >
                객실등록
              </Button>
            </Flex>
            <Spacing size={10} />
          </Link>
        </Flex>
      ))}
    </Flex>
  );
}

const containerStyles = css`
  width: 800px;
`;

const itemStyles = css`
  padding: 30px 20px 10px 30px;
  margin: 10px 40px;
  border-radius: 10px;
  background-color: ${colors.gray50};
`;

const imageStyles = css`
  border-radius: 10px;
`;

const buttonStyles = css`
  width: 100%;
  font-size: 16px;
`;

export default RegisterHotelList;
