import { parse } from "qs";
import Form from "../components/reservation/Form";
import useReservation from "../components/reservation/hooks/useReservation";
import Summary from "../components/reservation/Summary";
import { Spacing } from "../components/shared/Spacing";
import useUser from "../hooks/auth/userUser";
import { addDelimiter } from "../utils/addDelimiter";

function Reservation() {
  const user = useUser();
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true }
  ) as {
    startDate: string;
    endDate: string;
    nights: string;
    roomId: string;
    hotelId: string;
  };

  const { data, isLoading } = useReservation({ hotelId, roomId });

  if (data == null || isLoading) {
    return null;
  }

  const { room, hotel } = data;

  const handleSubmit = (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };
  };

  const buttonLabel = `${nights}박 ${addDelimiter(
    room.price * Number(nights)
  )}원 예약하기`;

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        buttonLabel={buttonLabel}
        onSubmit={handleSubmit}
        forms={hotel.forms}
      />
    </div>
  );
}

export default Reservation;
