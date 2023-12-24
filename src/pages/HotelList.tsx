import React from "react";
import useHotels from "../components/hotel_list/hooks/useHotels";
import Hotel from "../components/hotel_list/Hotel";
import Top from "../components/shared/Top";

function HotelList() {
  const { data: hotels } = useHotels();

  console.log(hotels);
  return (
    <div>
      <Top title="인기호텔" subTitle="호텔부터 펜션까지 최저가" />

      {hotels?.map((hotel) => (
        <Hotel key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default HotelList;
