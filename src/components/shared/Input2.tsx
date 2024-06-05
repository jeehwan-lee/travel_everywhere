import styled from "@emotion/styled";
import { colors } from "../../styles/colorPalette";

export const Input2 = styled.input`
  padding-left: 20px;
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
