import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { MdCancel } from "react-icons/md";
import { storage } from "../../api/firebase";

interface ImageItemProps {
  url: string;
  onDeleteImage: (url: string) => void;
}

function ImageItem({ url, onDeleteImage }: ImageItemProps) {
  const handleClick = async () => {
    try {
      const storageRef = ref(storage, url);

      await deleteObject(storageRef).then(() => {
        onDeleteImage(url);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img src={url} width="100%" height="100%" />
      <MdCancel
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "-40px",
          right: "-40px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      />
    </div>
  );
}

export default ImageItem;
