import { parse } from "qs";
import Form from "../components/reservation/Form";
import useReservation from "../components/reservation/hooks/useReservation";
import Summary from "../components/reservation/Summary";
import { Spacing } from "../components/shared/Spacing";

function Reservation() {
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

  const handleSubmit = () => {};

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
      <Form onSubmit={handleSubmit} forms={hotel.forms} />
    </div>
  );
}

export default Reservation;
