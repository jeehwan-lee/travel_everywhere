/** @jsxImportSource @emotion/react */

import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useHotels from "../components/hotel_list/hooks/useHotels";
import HotelItem from "../components/hotel_list/HotelItem";
import { Spacing } from "../components/shared/Spacing";
import Top from "../components/shared/Top";
import useLike from "../hooks/useLike";

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels();
  const { data: likes, mutate: like } = useLike();
  return (
    <div>
      <Top title="인기호텔" subTitle="호텔부터 펜션까지 최저가" />

      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId == hotel.id)
                )}
                onLike={like}
              />
              {hotels.length - 1 === idx ? null : (
                <Spacing size={10} backgroundColor="gray100" />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default HotelList;
