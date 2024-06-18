/** @jsxImportSource @emotion/react */

import qs from "qs";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { getHotelWithRoom } from "../remote/hotel";
import { getReservation } from "../remote/reservation";
import { useState } from "react";
import { css } from "@emotion/react";
import { colors } from "../styles/colorPalette";

function ReservationDone() {
  const { reservationId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    reservationId: string;
  };

  const [fetchedHotelRoom, setFetchedHotelRoom] = useState<any>(null);

  const { data, isLoading } = useQuery(
    ["reservationDone", reservationId],
    () => getReservation(reservationId),
    {
      onSuccess: async (reservation) => {
        const hotelWithRoom = await getHotelWithRoom({
          hotelId: reservation.hotelId,
          roomId: reservation.roomId,
        });
        setFetchedHotelRoom(hotelWithRoom);
      },
    }
  );

  const navigate = useNavigate();

  return (
    <Flex direction="column" css={containerStyles}>
      <Spacing size={40} />
      <img css={imageStyles} src={fetchedHotelRoom?.room?.imageUrl} alt="" />
      <Flex direction="column" justify="flex-start" css={itemStyles}>
        <Spacing size={30} />
        <Text typography="t2" bold>
          {fetchedHotelRoom?.hotel.name}
        </Text>
        <Spacing size={16} />
        <Flex direction="row">
          <Flex direction="column" style={{ width: "150px" }}>
            <Text color="gray500">객실</Text>
            <Spacing size={5} />
            <Text color="gray500">성함</Text>
            <Spacing size={5} />
            <Text color="gray500">이메일</Text>
            <Spacing size={5} />
            <Text color="gray500">전화번호</Text>
            <Spacing size={5} />
            <Text color="gray500">요구사항</Text>
          </Flex>
          <Flex direction="column">
            <Text>{fetchedHotelRoom?.room.roomName}</Text>
            <Spacing size={5} />
            <Text>{data?.formValues.name}</Text>
            <Spacing size={5} />
            <Text>{data?.formValues.email}</Text>
            <Spacing size={5} />
            <Text>{data?.formValues.phone}</Text>
            <Spacing size={5} />
            <Text>
              {data?.formValues.special_request == ""
                ? "없음"
                : data?.formValues.special_request}
            </Text>
          </Flex>
        </Flex>
        <Spacing size={16} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={20} />
      <Button css={buttonStyles} onClick={() => navigate("/reservation/list")}>
        예약 리스트로
      </Button>
    </Flex>
  );
}

const containerStyles = css`
  width: 800px;
`;

const imageStyles = css`
  width: 450px;
  height: 420px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 190px;
`;

const itemStyles = css`
  margin-left: 170px;
`;

const buttonStyles = css`
  margin-left: 170px;
  width: 490px;
  font-size: 16px;
`;

export default ReservationDone;
