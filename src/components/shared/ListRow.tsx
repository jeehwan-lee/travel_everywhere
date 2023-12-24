/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import Flex from "./Flex";
import Text from "./Text";
import { IoIosArrowForward } from "react-icons/io";

interface ListRowProps {
  left?: React.ReactNode;
  contents?: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: "div" | "li";
  style?: SerializedStyles;
}

function ListRow({
  as = "li",
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  );
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;

const listRowContentsStyles = css`
  flex: 1;
`;

function ListRowTexts({
  title,
  subTitle,
}: {
  title: string | React.ReactNode;
  subTitle: string;
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}
function IconArrowRight() {
  return <IoIosArrowForward />;
}

ListRow.Texts = ListRowTexts;

export default ListRow;
