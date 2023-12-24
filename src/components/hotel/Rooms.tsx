/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { addDelimiter } from "../../utils/addDelimiter";
import Button from "../shared/Button";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import { Spacing } from "../shared/Spacing";
import Tag from "../shared/Tag";
import Text from "../shared/Text";
import useRooms from "./hooks/useRooms";

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId });

  console.log(data);
  return (
    <Container>
      <Flex justify="space-between" align="center" css={headerStyles}>
        <Text bold={true} typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금포함
        </Text>
      </Flex>
      <ul>
        {data?.map((room) => {
          const isDeadline = room.avaliableCount === 1;
          const isSoldOut = room.avaliableCount === 0;

          return (
            <ListRow
              left={
                <img
                  css={imageStyles}
                  src={room.imageUrl}
                  alt={`${room.roomName} 이미지`}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {isDeadline === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? "환불가능" : "환불불가"
                  )}
                ></ListRow.Texts>
              }
              right={
                <Button size="medium" disabled={isSoldOut}>
                  {isSoldOut === true ? "매진" : "선택"}
                </Button>
              }
            ></ListRow>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 0;
`;

const headerStyles = css`
  padding: 0 24px;
  margin-bottom: 20px;
`;

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export default Rooms;
