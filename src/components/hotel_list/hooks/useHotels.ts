import { useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { getHotels } from "../../../remote/hotel";

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

  return { data, loadMore, isFetching, hasNextPage };
}

export default useHotels;
