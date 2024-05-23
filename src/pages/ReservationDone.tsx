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
    <div>
      <Spacing size={80} />
      <Flex direction="column" align="center">
        <img
          css={imageStyles}
          src={fetchedHotelRoom?.room?.imageUrl}
          alt=""
          width="50%"
          height="50%"
        />
        <Spacing size={30} />
        <Text typography="t2" bold>
          {fetchedHotelRoom?.hotel.name}
        </Text>

        <Text>{fetchedHotelRoom?.room.roomName}</Text>
        <Text>{data?.formValues.name}</Text>
        <Text>{data?.formValues.email}</Text>
        <Text>{data?.formValues.phone}</Text>
        <Text>{data?.formValues.special_request}</Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: "24px" }}>
        <Button.Group>
          <Button onClick={() => navigate("/")}>홈으로</Button>
          <Button onClick={() => navigate("/reservation/list")}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}

const imageStyles = css`
  width: 60%;
  height: 60%;
  object-fit: cover;
  border-radius: 4px;
`;

export default ReservationDone;
