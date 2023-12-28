import qs from "qs";
import { useEffect, useState } from "react";
import RangePicker from "../components/shared/RangePicker";

function Schedule() {
  const { roomId, hotelId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string };

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  });

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
    </div>
  );
}

export default Schedule;
