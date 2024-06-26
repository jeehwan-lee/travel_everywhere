import { useMutation, useQuery, useQueryClient } from "react-query";
import useUser from "../../../hooks/auth/userUser";
import {
  getReviews,
  modifyReview,
  removeReview,
  writeReview,
} from "../../../api/review";

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
        photoURL: user?.photoURL as string,
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

  const { mutateAsync: modify } = useMutation(
    async ({ text, reviewId }: { text: string; reviewId: string }) => {
      const modifiedReview = {
        id: reviewId,
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        photoURL: user?.photoURL as string,
        text,
      };

      await modifyReview(modifiedReview);

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

  return { data, isLoading, write, remove, modify };
}

export default useReview;
