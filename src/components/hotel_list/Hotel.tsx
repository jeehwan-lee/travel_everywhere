/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Hotel as IHotel } from "../../models/hotel";
import { addDelimiter } from "../../utils/addDelimiter";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Tag from "../shared/Tag";
import Text from "../shared/Text";

function Hotel({ hotel }: { hotel: IHotel }) {
  const tagComponent = () => {
    if (hotel.events == null) {
      return null;
    }

    const { name } = hotel.events;

    console.log(name);

    return (
      <div>
        <Tag>{name}</Tag>
        <Spacing size={8} />
      </div>
    );
  };
  return (
    <div>
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
