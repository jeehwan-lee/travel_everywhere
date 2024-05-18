/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Flex from "./Flex";
import { Spacing } from "./Spacing";
import Text from "./Text";

interface TopProps {
  title: string;
  subTitle: string;
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={ContainerStyles}>
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Spacing size={4} />
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}

const ContainerStyles = css`
  padding: 24px;
`;

export default Top;
