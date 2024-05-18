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
import { registerHotel } from "../remote/register";
import useUser from "../hooks/auth/userUser";

function RegisterHotel() {
  const navigate = useNavigate();
  const user = useUser();

  const startRatingList = [
    {
      label: "1성급",
      value: 1,
    },
    {
      label: "2성급",
      value: 2,
    },
    {
      label: "3성급",
      value: 3,
    },
    {
      label: "4성급",
      value: 4,
    },
    {
      label: "5성급",
      value: 5,
    },
  ];

  const [newHotel, setNewHotel] = useState<HotelRegister>({
    comment: "",
    contents: "",
    name: "",
    price: 0,
    startRating: 5,
    location: { x: 0, y: 0 },
    images: [],
    userId: user?.uid,
    likes: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setNewHotel({
        ...newHotel,
        location: { x: position.coords.latitude, y: position.coords.longitude },
      });
    });
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleLocation = (e: any) => {
    setNewHotel({
      ...newHotel,
      location: { x: e.latLng?.lat(), y: e.latLng?.lng() },
    });
  };

  const handleSubmit = async () => {
    const newHotelId = await registerHotel(newHotel);
    navigate(`/register/Room?hotelId=${newHotelId}`);
  };

  const handleFileChange = (newImageUrl: string) => {
    const newImageList = [...newHotel.images, newImageUrl];
    setNewHotel({ ...newHotel, images: newImageList });
  };

  const handleDeleteImage = (deleteImageUrl: string) => {
    const newImageList = newHotel.images.filter((value) => {
      return value !== deleteImageUrl;
    });

    setNewHotel({ ...newHotel, images: newImageList });
  };

  return (
    <div style={{ padding: 24 }}>
      <Text typography="t4" bold={true}>
        호텔정보
      </Text>
      <Spacing size={16} />
      <TextField
        label="호텔명"
        name="name"
        value={newHotel.name}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <TextField
        label="호텔소개"
        name="comment"
        helpMessage="간단한 호텔 소개글을 작성해주세요"
        value={newHotel.comment}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <ContentEditor
        name="contents"
        onChangeEditor={(value: string) =>
          setNewHotel({ ...newHotel, contents: value })
        }
        label="호텔 상세"
        helpMessage="호텔에 대한 상세내용을 작성해주세요"
      />
      <Spacing size={8} />
      <TextField
        label="호텔가격"
        name="price"
        value={newHotel.price}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <Select
        label="등급"
        options={startRatingList}
        name="startRating"
        value={newHotel.startRating}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <Map location={newHotel.location} setNewLocation={handleLocation} />
      <Spacing size={20} />
      <Text typography="t4" bold={true}>
        호텔사진
      </Text>
      <Spacing size={8} />
      <Flex justify="center" align="center" direction="column">
        <ImageUpload onChangeFile={handleFileChange} />
        <Spacing size={50} />
        <Grid>
          {newHotel.images.map((url, index) => (
            <ImageItem
              key={index}
              url={url}
              onDeleteImage={handleDeleteImage}
            />
          ))}
        </Grid>
      </Flex>
      <Spacing size={80} />
      <FixedBottomButton label="등록하기" onClick={handleSubmit} />
    </div>
  );
}

export default RegisterHotel;
