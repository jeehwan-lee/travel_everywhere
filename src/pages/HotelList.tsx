/** @jsxImportSource @emotion/react */

import React, { Fragment, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useHotels from "../components/hotel_list/hooks/useHotels";
import HotelItem from "../components/hotel_list/HotelItem";
import { Spacing } from "../components/shared/Spacing";
import Top from "../components/shared/Top";
import useLike from "../hooks/useLike";
import qs from "qs";

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels();
  const { data: likes, mutate: like } = useLike();

  const { search } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { search: string };

  return (
    <div>
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
