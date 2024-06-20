import React, { InputHTMLAttributes, useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import Text from "../shared/Text";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../api/firebase";

interface ContentEditorProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
  onChangeEditor: (e: string) => void;
}

function ContentEditor({
  label,
  hasError,
  helpMessage,
  onChangeEditor,
}: ContentEditorProps) {
  const [focused, setFocused] = useState(false);

  const quillRef = useRef<any>(null);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);

      try {
        const storageRef = ref(storage, `image/hotel/${Date.now()}`);
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file as Blob).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
            console.log("url 확인", url);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

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
        ref={quillRef}
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
        onChange={onChangeEditor}
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
