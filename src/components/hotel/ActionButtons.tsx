/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import useLike from "../../hooks/useLike";
import useShare from "../../hooks/useShare";
import { Hotel } from "../../models/hotel";
import Flex from "../shared/Flex";
import { Spacing } from "../shared/Spacing";
import Text from "../shared/Text";

function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare();
  const { data: likes, mutate: like } = useLike();

  const { name, comment, mainImageUrl, id } = hotel;

  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id));

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        iconUrl={
          isLike
            ? "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
            : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png"
        }
        onClick={() =>
          like({
            hotel: {
              name: name,
              id: id,
              mainImageUrl: mainImageUrl,
            },
          })
        }
      ></Button>
      <Button
        label="공유하기"
        iconUrl="	https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: "Love Trip에서 보기",
          });
        }}
      ></Button>
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => alert("링크가 복사되었습니다")}
      >
        <Button
          label="링크복사"
          iconUrl="	https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-49-512.png"
        ></Button>
      </CopyToClipboard>
    </Flex>
  );
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string;
  iconUrl: string;
  onClick?: () => void;
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`;
export default ActionButtons;
