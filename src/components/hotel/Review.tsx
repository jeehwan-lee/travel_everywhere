import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useUser from "../../hooks/auth/userUser";
import Button from "../shared/Button";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Text from "../shared/Text";
import { TextField } from "../shared/TextField";
import useReview from "./hooks/useReview";

function Review({ hotelId }: { hotelId: string }) {
  const {
    data: reviews,
    isLoading,
    write,
    remove,
    modify,
  } = useReview({ hotelId });
  const user = useUser();

  const [text, setText] = useState<string>("");
  const [modifiedReviewText, setModifiedReviewText] = useState<string>("");
  const [reviewEditMode, setReviewEditMode] = useState<boolean>(false);

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [text]
  );

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
          <Text typography="t6">아직 작성된 리뷰가 없습니다.</Text>
        </Flex>
      );
    }

    return (
      <ul>
        {reviews?.map((review) => {
          return (
            <ListRow
              left={
                review.photoURL != null ? (
                  <img
                    src={review.photoURL}
                    width={40}
                    height={40}
                    style={{ borderRadius: "100%" }}
                  />
                ) : null
              }
              contents={
                <ListRow.Texts
                  title={
                    reviewEditMode === false ? (
                      review.text
                    ) : (
                      <TextField
                        value={modifiedReviewText}
                        onChange={(e) => {
                          setModifiedReviewText(e.target.value);
                        }}
                      />
                    )
                  }
                  subTitle={format(review.createdAt, "yyyy-MM-dd")}
                />
              }
              right={
                review.userId === user?.uid ? (
                  <>
                    {reviewEditMode === false ? (
                      <>
                        <Button
                          weak={true}
                          onClick={() => {
                            remove({ reviewId: review.id, hotelId: hotelId });
                          }}
                        >
                          삭제
                        </Button>
                        <Spacing size={4} direction="horizontal" />
                        <Button onClick={() => setReviewEditMode(true)}>
                          수정
                        </Button>
                      </>
                    ) : (
                      <>
                        {reviewEditMode}
                        <Button
                          onClick={() => {
                            modify({
                              text: modifiedReviewText,
                              reviewId: review.id,
                            });
                            setReviewEditMode(false);
                          }}
                        >
                          확인
                        </Button>
                      </>
                    )}
                  </>
                ) : null
              }
            />
          );
        })}
      </ul>
    );
  }, [reviews, user, reviewEditMode, modifiedReviewText]);

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
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={text === ""}
              onClick={async () => {
                const success = await write(text);

                if (success === true) {
                  setText("");
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}

export default Review;
