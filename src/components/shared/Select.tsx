import styled from "@emotion/styled";
import { SelectHTMLAttributes, forwardRef, useState } from "react";
import Flex from "./Flex";
import Text from "./Text";
import { colors } from "../../styles/colorPalette";

export interface Option {
  label: string;
  value: string | number | undefined;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

const BaseSelect = styled.select`
  height: 52px;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  const labelColor = focused ? "blue" : undefined;

  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color={labelColor}
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect
        required={true}
        ref={ref}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  );
});

export default Select;
