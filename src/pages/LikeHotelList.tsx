/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { addDelimiter } from "../utils/addDelimiter";
import { Link, useNavigate } from "react-router-dom";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import { colors } from "../styles/colorPalette";
import { MdChevronRight } from "react-icons/md";
import useRegisterHotelList from "../components/register/hooks/useRegisterHotelList";
import { Spacing } from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import { IoIosClose } from "react-icons/io";
import { removeHotel } from "../api/hotel";
import { getLikes, removeLike, toggleLike } from "../api/like";
import useUser from "../hooks/auth/userUser";
import { Like } from "../models/like";

function LikeHotelList() {
  const navigate = useNavigate();

  const user = useUser();

  const [likeHotelList, setLikeHotelList] = useState<Like[]>([]);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    getLikes({ userId: user?.uid }).then((d) => setLikeHotelList(d));
  }, []);

  if (likeHotelList.length == 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        css={containerStyles}
      >
        <img
          src="https://cdn2.iconfinder.com/data/icons/essential-web-5/50/note-short-reminder-memo-brief-512.png"
          alt=""
          width={50}
          height={50}
        />
        <Spacing size={15} />
        <Text typography="t6">등록한 호텔이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" css={containerStyles}>
      <Spacing size={20} />
      {likeHotelList.map((hotel) => (
        <Flex css={itemStyles}>
          <Link to={`/hotel/${hotel.id}`} style={{ width: "100%" }}>
            <Flex justify="flex-end">
              <img
                css={iconHeartStyles}
                src={
                  "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
                }
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  removeLike(hotel.hotelId, user?.uid as string).then(() => {
                    navigate("/like/list");
                  });
                }}
              />
            </Flex>
            <Flex>
              <img
                css={imageStyles}
                src={hotel.hotelMainImageUrl}
                alt={`${hotel.hotelName} 이미지`}
                width={100}
                height={100}
              />
              <Spacing size={20} direction="horizontal" />
              <Flex direction="column">
                <Text bold={true} typography="t4">
                  {hotel.hotelName}
                </Text>
                <Spacing size={5} />
              </Flex>
            </Flex>
            <Flex justify="flex-end" align="center">
              <Text color="gray600">상세보기</Text>
              <MdChevronRight color={colors.gray500} />
            </Flex>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
}

const containerStyles = css`
  width: 800px;
`;

const itemStyles = css`
  padding: 10px 20px 10px 30px;
  margin: 10px 40px;
  border-radius: 10px;
  background-color: ${colors.gray50};
`;

const imageStyles = css`
  border-radius: 10px;
`;

const buttonStyles = css`
  width: 100%;
  font-size: 16px;
`;

const iconHeartStyles = css`
  width: 30px;
  height: 30px;
`;

const deleteButtonStyles = css`
  color: ${colors.gray500};
  font-size: 30px;

  &:hover {
    font-size: 34px;
    color: ${colors.gray700};
  }
`;

export default LikeHotelList;
