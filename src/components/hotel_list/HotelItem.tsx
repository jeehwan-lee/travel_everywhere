/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Hotel, Hotel as IHotel } from "../../models/hotel";
import { addDelimiter } from "../../utils/addDelimiter";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Tag from "../shared/Tag";
import Text from "../shared/Text";
import { differenceInMilliseconds } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import formatTime from "../../utils/formatTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelItem({
  hotel,
  isLike,
  onLike,
}: {
  hotel: IHotel;
  isLike: boolean;
  onLike: ({
    hotel,
  }: {
    hotel: Pick<IHotel, "name" | "id" | "mainImageUrl">;
  }) => void;
}) {
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return;
    }

    const promoEndTime = hotel.events.promoEndTime;

    const Timer = setInterval(() => {
      const lastSeconds = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date()
      );

      if (lastSeconds < 0) {
        clearInterval(Timer);
        return;
      }

      setRemainedTime(lastSeconds);
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  });

  const tagComponent = () => {
    if (hotel.events == null) {
      return null;
    }

    const { name, tagThemeStyle } = hotel.events;

    const promotionTxt =
      remainedTime > 0 ? `${formatTime(remainedTime)} 남음` : ``;

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    );
  };

  const handleLike = (e: any) => {
    e.preventDefault();
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    });
  };

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {hotel.startRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex
              style={{ position: "relative" }}
              direction="column"
              align="flex-end"
            >
              <img
                css={iconHeartStyles}
                src={
                  isLike
                    ? "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
                    : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png"
                }
                alt=""
                onClick={handleLike}
              />
              <img src={hotel.mainImageUrl} alt="" css={imageStyles} />
              <Spacing size={8} />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  );
}

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`;

const containerStyles = css`
  align-items: flex-start;
`;

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`;
export default HotelItem;
