import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";
import { PiImagesThin } from "react-icons/pi";
import { storage } from "../../remote/firebase";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

interface ImageUploadProps {
  onChangeFile: (e: string) => void;
}

function ImageUpload({ onChangeFile }: ImageUploadProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  const fileHandler = () => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      const storageRef = ref(storage, `image/hotel/${Date.now()}`);
      // Firebase Method : uploadBytes, getDownloadURL
      await uploadBytes(storageRef, file as Blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          onChangeFile(url);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="file"
        ref={inputElement}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Flex
        onClick={fileHandler}
        direction="column"
        align="center"
        style={{
          border: "dashed 2px black",
          borderRadius: "10px",
          width: "100%",
          height: "500px",
        }}
      >
        <PiImagesThin style={{ width: "100%", height: "100%" }} />
        <Text typography="t4" bold={true}>
          UPLOAD
        </Text>
      </Flex>
    </>
  );
}

export default ImageUpload;
