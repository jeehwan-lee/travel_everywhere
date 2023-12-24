/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { addDelimiter } from "../../utils/addDelimiter";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Text from "../shared/Text";
import useRecommendHotels from "./hooks/useRecommendHotels";
import Button from "../shared/Button";

function RecommendHotels({ recommendHotels }: { recommendHotels: string[] }) {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels });
  const [showMore, setShowMore] = useState(false);

  if (data === null || isLoading) {
    return null;
  }

  const hotelList =
    (data && data?.length < 3) || showMore ? data : data?.slice(0, 3);

  return (
    <div style={{ margin: "24px 0" }}>
      <Text bold={true} typography="t4" style={{ padding: "0 24px" }}>
        추천호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {hotelList?.map((hotel) => {
          return (
            <ListRow
              key={hotel.id}
              left={<img css={imageStyles} src={hotel.mainImageUrl} alt="" />}
              contents={
                <ListRow.Texts
                  title={hotel.name}
                  subTitle={`${addDelimiter(hotel.price)}원`}
                />
              }
            />
          );
        })}
      </ul>
      {data && data?.length > 3 && showMore == false ? (
        <div style={{ padding: "0 24px", marginTop: "16px" }}>
          <Button full={true} weak={true} onClick={() => setShowMore(true)}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export default RecommendHotels;
