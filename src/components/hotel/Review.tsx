import { format } from "date-fns";
import { useCallback } from "react";
import useUser from "../../hooks/auth/userUser";
import Button from "../shared/Button";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Text from "../shared/Text";
import { TextField } from "../shared/TextField";
import useReview from "./hooks/useReview";

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading } = useReview({ hotelId });
  const user = useUser();

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" justify="center">
          <img
            src="https://cdn2.iconfinder.com/data/icons/essential-web-5/50/note-short-reminder-memo-brief-512.png"
            alt=""
            width={30}
            height={30}
          />
          <Spacing size={15} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요.
          </Text>
        </Flex>
      );
    }

    return (
      <ul>
        {reviews?.map((review) => {
          return (
            <ListRow
              left={
                review.user.photoURL != null ? (
                  <img src={review.user.photoURL} />
                ) : null
              }
              contents={
                <ListRow.Texts
                  title={review.text}
                  subTitle={format(review.createdAt, "YYYY-MM-dd")}
                />
              }
              right={review.userId === user?.uid ? <Button>삭제</Button> : null}
            />
          );
        })}
      </ul>
    );
  }, [reviews, user]);

  if (isLoading === true) {
    return null;
  }

  return (
    <div style={{ margin: "40px 0" }}>
      <Text bold={true} typography="t4" style={{ padding: "0 24px" }}>
        리뷰
      </Text>
      <Spacing size={20} />
      {reviewRows()}
      <Spacing size={20} />
      {user != null ? (
        <div>
          <TextField />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button disabled={true}>작성</Button>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}

export default Review;
