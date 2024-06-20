import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { getHotels } from "../../../api/hotel";

function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["hotels"],
    ({ pageParam }) => {
      return getHotels(pageParam);
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      },
    }
  );

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, isFetching, hasNextPage]);

  const hotels = data?.pages.map(({ items }) => items).flat();

  return { data: hotels, loadMore, isFetching, hasNextPage };
}

export default useHotels;
