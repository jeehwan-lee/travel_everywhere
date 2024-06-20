/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { addDelimiter } from "../utils/addDelimiter";
import { Link } from "react-router-dom";
import useReservationList from "../components/reservation/hooks/useReservationList";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { colors } from "../styles/colorPalette";
import { MdChevronRight } from "react-icons/md";

function ReservationList() {
  const { data, isLoading } = useReservationList();

  if (data == null || data.length === 0 || isLoading == true) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        css={containerStyles}
      >
        <img
          src="https://cdn2.iconfinder.com/data/icons/essential-web-5/50/note-short-reminder-memo-brief-512.png"
          alt=""
          width={50}
          height={50}
        />
        <Spacing size={15} />
        <Text typography="t6">예약한 호텔이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" css={containerStyles}>
      <Spacing size={20} />
      {data.map(({ hotel, reservation }) => (
        <Flex css={itemStyles}>
          <Link
            to={`/reservation/done?reservationId=${reservation.id}`}
            style={{ width: "100%" }}
          >
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
                <Spacing size={5} />
                <Text
                  typography="t6"
                  color="gray500"
                >{`${reservation.startDate} ~ ${reservation.endDate}`}</Text>
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

export default ReservationList;
