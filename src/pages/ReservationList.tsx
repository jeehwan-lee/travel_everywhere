import React from "react";
import { Link } from "react-router-dom";
import useReservationList from "../components/reservation/hooks/useReservationList";
import ListRow from "../components/shared/ListRow";

function ReservationList() {
  const { data, isLoading } = useReservationList();

  if (data == null || isLoading == true) {
    return null;
  }

  return (
    <div>
      {data.map(({ hotel, reservation }) => (
        <Link to={`/reservation/done?reservationId=${reservation.id}`}>
          <ListRow
            key={reservation.id}
            left={
              <img
                src={hotel.images[0]}
                alt={`${hotel.name} 이미지`}
                width={80}
                height={80}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${reservation.startDate} ~ ${reservation.endDate}`}
              />
            }
          />
        </Link>
      ))}
    </div>
  );
}

export default ReservationList;
