/** @jsxImportSource @emotion/react */

import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useHotels from "../components/hotel_list/hooks/useHotels";
import HotelItem from "../components/hotel_list/HotelItem";
import useRegisterHotelList from "../components/register/hooks/useRegisterHotelList";
import ListRow from "../components/shared/ListRow";
import { Spacing } from "../components/shared/Spacing";
import Top from "../components/shared/Top";
import useLike from "../hooks/useLike";

function RegisterHotelList() {
  const { data, isLoading } = useRegisterHotelList();

  if (data == null || isLoading == true) {
    return null;
  }

  return (
    <div>
      {data.items.map((hotel) => (
        <ListRow
          key={hotel.id}
          left={
            <img
              src={hotel.images[0]}
              alt={`${hotel.name} 이미지`}
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
          }
        />
      ))}
    </div>
  );
}

export default RegisterHotelList;
