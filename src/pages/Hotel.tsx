import React from "react";
import { useParams } from "react-router-dom";
import ActionButtons from "../components/hotel/ActionButtons";
import Carousel from "../components/hotel/Carousel";
import Contents from "../components/hotel/Contents";
import useHotel from "../components/hotel/hooks/useHotel";
import Map from "../components/hotel/Map";
import RecommendHotels from "../components/hotel/RecommendHotels";
import Review from "../components/hotel/Review";
import Rooms from "../components/hotel/Rooms";
import { Spacing } from "../components/shared/Spacing";
import Top from "../components/shared/Top";

function Hotel() {
  const { id } = useParams() as { id: string };

  const { isLoading, data } = useHotel({ id });

  if (data == null || isLoading) {
    return <div>Loading...</div>;
  }

  const { name, comment, images, contents, location, userId } = data;
  return (
    <div>
      <Top title={name} subTitle={comment} id={id} userId={userId} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Spacing size={5} backgroundColor="gray100" />
      <Rooms hotelId={id} />
      <Spacing size={5} backgroundColor="gray100" />
      <Contents contents={contents} />
      <Spacing size={5} backgroundColor="gray100" />
      <Map location={location} />
      <Spacing size={5} backgroundColor="gray100" />
      {/* <RecommendHotels recommendHotels={recommendHotels} /> */}
      <Review hotelId={id} />
    </div>
  );
}

export default Hotel;
