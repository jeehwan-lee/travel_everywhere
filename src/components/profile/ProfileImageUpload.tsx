import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";
import { storage } from "../../remote/firebase";

interface ProfileImageUploadProps {
  imageUrl?: string;
  onChangeFile: (url: string) => void;
}

function ProfileImageUpload({
  imageUrl,
  onChangeFile,
}: ProfileImageUploadProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  const fileHandler = () => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      const storageRef = ref(storage, `image/profile/${Date.now()}`);
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
      <img
        src={
          imageUrl ??
          "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-64.png"
        }
        alt=""
        width={100}
        height={100}
        style={{ borderRadius: "100%", cursor: "pointer" }}
        onClick={fileHandler}
      />
    </>
  );
}

export default ProfileImageUpload;
