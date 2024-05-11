import React, { InputHTMLAttributes, FocusEventHandler, useState } from "react";
import ReactQuill from "react-quill";
import { colors } from "../../styles/colorPalette";
import Text from "../shared/Text";

interface ContentEditorProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

function ContentEditor({ label, hasError, helpMessage }: ContentEditorProps) {
  const [focused, setFocused] = useState(false);

  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
    },
  };

  const labelColor = hasError ? "red" : focused ? "blue" : undefined;

  return (
    <>
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
      <ReactQuill
        style={{
          width: "100%",
          height: "600px",
          marginBottom: "44px",
        }}
        modules={modules}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {helpMessage ? (
        <Text
          typography="t7"
          color={labelColor}
          display="inline-block"
          style={{ marginTop: 6, fontSize: 12 }}
        >
          {helpMessage}
        </Text>
      ) : null}
    </>
  );
}

export default ContentEditor;
