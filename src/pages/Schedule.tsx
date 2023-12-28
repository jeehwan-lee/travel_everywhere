import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FixedBottomButton from "../components/shared/FixedBottomButton";
import RangePicker from "../components/shared/RangePicker";

function Schedule() {
  const { roomId, hotelId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string };

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  });

  const isSubmit =
    selectedDate.startDate != null && selectedDate.endDate != null;

  const buttonLabel = isSubmit
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : "예약날짜를 선택해주세요";

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true }
    );

    navigate(`/reservation${params}`);
  };

  useEffect(() => {
    if (roomId === "" || hotelId === "") {
      window.history.back();
    }
  }, [roomId, hotelId]);

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          });
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={isSubmit === false}
        onClick={() => moveToReservationPage()}
      />
    </div>
  );
}

export default Schedule;
