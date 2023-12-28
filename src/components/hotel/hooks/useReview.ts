import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "../../../hooks/auth/userUser";
import { getReviews, removeReview, writeReview } from "../../../remote/review";

function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(["reviews", hotelId], () =>
    getReviews({ hotelId })
  );
  const client = useQueryClient();
  const user = useUser();

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      };

      await writeReview(newReview);

      return true;
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["reviews", hotelId]);
      },
    }
  );

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["reviews", hotelId]);
      },
    }
  );

  return { data, isLoading, write, remove };
}

export default useReview;
