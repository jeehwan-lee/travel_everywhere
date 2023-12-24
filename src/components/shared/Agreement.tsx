/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Flex from "./Flex";
import Text from "./Text";
import { CiCircleCheck } from "react-icons/ci";
import { colors } from "../../styles/colorPalette";
import { MouseEvent } from "react";
import { FaCheck } from "react-icons/fa6";

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  );
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}) {
  return (
    <Flex
      as="li"
      onClick={(e) => {
        onChange(e, !checked);
      }}
    >
      <CiCircleCheck
        style={{
          marginTop: "5px",
          color: checked ? colors.blue : colors.gray,
        }}
      />
      <Text bold={true}>{children}</Text>
    </Flex>
  );
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
  link?: string;
}) {
  return (
    <Flex as="li" justify="space-between">
      <Flex
        onClick={(e) => {
          onChange(e, !checked);
        }}
      >
        <FaCheck
          style={{
            marginTop: "3px",
            color: checked ? colors.blue : colors.gray,
          }}
        />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link}>
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  );
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`;

Agreement.Title = AgreementTitle;
Agreement.Description = AgreementDescription;

export default Agreement;
