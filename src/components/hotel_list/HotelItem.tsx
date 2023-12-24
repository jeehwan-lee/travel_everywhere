/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Hotel as IHotel } from "../../models/hotel";
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

function Hotel({ hotel }: { hotel: IHotel }) {
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
            <Flex direction="column" align="flex-end">
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
export default Hotel;
