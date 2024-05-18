import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentEditor from "../components/register/ContentEditor";
import Map from "../components/register/Map";
import FixedBottomButton from "../components/shared/FixedBottomButton";
import Flex from "../components/shared/Flex";
import Select from "../components/shared/Select";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { TextField } from "../components/shared/TextField";
import { HotelRegister, RoomRegister } from "../models/register";
import { PiImagesThin } from "react-icons/pi";
import Grid from "../components/shared/Grid";
import ImageUpload from "../components/register/ImageUpload";
import ImageItem from "../components/register/ImageItem";
import { registerHotel, registerRoom } from "../remote/register";
import { parse } from "qs";

function RegisterRoom() {
  const navigate = useNavigate();

  const { hotelId } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelId: string;
  };

  const smokeList = [
    {
      label: "금연",
      value: "금연",
    },
    {
      label: "흡연",
      value: "흡연",
    },
  ];

  const [rooms, setRooms] = useState<RoomRegister>({
    avaliableCount: 0,
    basicInfo: {
      bed: "dddd",
      maxOccupancy: 0,
      smoke: "금연",
      squareMeters: "0평",
    },
    imageUrl: "",
    price: 0,
    roomName: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setRooms({ ...rooms, [e.target.name]: e.target.value });
  };

  const handleBasicInfoChange = (e: { target: { name: any; value: any } }) => {
    const newBasicInfo = {
      ...rooms.basicInfo,
      [e.target.name]: e.target.value,
    };

    setRooms({ ...rooms, basicInfo: newBasicInfo });
  };

  const handleSubmit = async () => {
    await registerRoom(rooms, hotelId);
    navigate(`/`);
  };

  const handleFileChange = (newImageUrl: string) => {
    setRooms({ ...rooms, imageUrl: newImageUrl });
  };

  const handleDeleteImage = (deleteImageUrl: string) => {
    setRooms({ ...rooms, imageUrl: "" });
  };

  return (
    <div style={{ padding: 24 }}>
      <Text typography="t4" bold={true}>
        객실정보
      </Text>
      <Spacing size={16} />
      <TextField
        label="객실명"
        name="roomName"
        value={rooms.roomName}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <TextField
        label="가격"
        name="price"
        value={rooms.price}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <TextField
        label="객실수"
        name="avaliableCount"
        value={rooms.avaliableCount}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <TextField
        label="침대"
        name="bed"
        value={rooms.basicInfo.bed}
        onChange={handleBasicInfoChange}
      />
      <Spacing size={8} />
      <TextField
        label="수용인원"
        name="maxOccupancy"
        value={rooms.basicInfo.maxOccupancy}
        onChange={handleBasicInfoChange}
      />
      <Spacing size={8} />
      <TextField
        label="평수"
        name="squareMeters"
        value={rooms.basicInfo.squareMeters}
        onChange={handleBasicInfoChange}
      />
      <Spacing size={8} />
      <Select
        label="흡연/금연"
        options={smokeList}
        name="smoke"
        value={rooms.basicInfo.smoke}
        onChange={handleBasicInfoChange}
      />
      <Spacing size={20} />
      <Text typography="t4" bold={true}>
        객실사진
      </Text>
      <Spacing size={8} />
      <Flex justify="center" align="center" direction="column">
        <ImageUpload onChangeFile={handleFileChange} />
        <Spacing size={50} />
        {rooms.imageUrl !== "" && (
          <ImageItem url={rooms.imageUrl} onDeleteImage={handleDeleteImage} />
        )}
      </Flex>
      <Spacing size={80} />
      <FixedBottomButton label="등록하기" onClick={handleSubmit} />
    </div>
  );
}

export default RegisterRoom;
