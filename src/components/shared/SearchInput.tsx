/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { colors } from "../../styles/colorPalette";
import { CiSearch } from "react-icons/ci";

import React from "react";
import { css } from "@emotion/react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div css={containerStyles}>
      <CiSearch css={iconStyles} />
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default SearchInput;

const containerStyles = css`
  position: relative;
`;

const iconStyles = css`
  position: absolute;
  top: 12px;
  left: 10px;
  font-size: 26px;
  color: ${colors.gray700};
`;

export const Input = styled.input`
  padding-left: 46px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  width: 400px;
  box-sizing: border-box;
  background-color: ${colors.gray50};

  &:focus {
    background-color: ${colors.white};
    border: 2px solid ${colors.gray300};
  }
`;
