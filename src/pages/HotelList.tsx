import React from "react";
import useHotels from "../components/hotel_list/hooks/useHotels";

function HotelList() {
  const { data: hotels } = useHotels();

  console.log(hotels);
  return <div>HotelList</div>;
}

export default HotelList;
