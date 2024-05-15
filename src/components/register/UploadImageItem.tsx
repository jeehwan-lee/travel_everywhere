import React from "react";
import { MdCancel } from "react-icons/md";

function UploadImageItem() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img
        src="https://www.touropia.com/gfx/d/amazing-hotels-in-japan/Hakone_Ginyu.jpg"
        width="100%"
        height="100%"
      />
      <MdCancel
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "-40px",
          right: "-40px",
        }}
      />
    </div>
  );
}

export default UploadImageItem;
