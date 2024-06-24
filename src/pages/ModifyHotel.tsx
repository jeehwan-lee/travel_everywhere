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
import { Hotel } from "../models/hotel";
import { PiImagesThin } from "react-icons/pi";
import Grid from "../components/shared/Grid";
import ImageUpload from "../components/register/ImageUpload";
import ImageItem from "../components/register/ImageItem";
import { modifyHotelDesc, registerHotel } from "../api/register";
import useUser from "../hooks/auth/userUser";
import qs from "qs";
import { getHotel } from "../api/hotel";

function ModifyHotel() {
  const navigate = useNavigate();
  const user = useUser();

  const [modifyHotel, setModifyHotel] = useState<Hotel>({
    comment: "",
    contents: "",
    id: "",
    images: [],
    location: { x: 0, y: 0 },
    mainImageUrl: "",
    name: "",
    price: 0,
    startRating: 0,
    recommendHotels: [],
    forms: [],
  });

  const { hotelId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelId: string;
  };

  useEffect(() => {
    getHotel(hotelId).then((result) => {
      setModifyHotel(result);
    });
  }, []);

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setModifyHotel({ ...modifyHotel, [e.target.name]: e.target.value });
  };

  const handleLocation = (e: any) => {
    setModifyHotel({
      ...modifyHotel,
      location: { x: e.latLng?.lat(), y: e.latLng?.lng() },
    });
  };

  const handleSubmit = async () => {
    await modifyHotelDesc(modifyHotel);
    navigate(`/hotel/${modifyHotel.id}`);
  };

  const handleFileChange = (newImageUrl: string) => {
    const newImageList = [...modifyHotel.images, newImageUrl];
    setModifyHotel({ ...modifyHotel, images: newImageList });
  };

  const handleDeleteImage = (deleteImageUrl: string) => {
    const newImageList = modifyHotel.images.filter((value) => {
      return value !== deleteImageUrl;
    });

    setModifyHotel({ ...modifyHotel, images: newImageList });
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
        value={modifyHotel.name}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <TextField
        label="호텔소개"
        name="comment"
        helpMessage="간단한 호텔 소개글을 작성해주세요"
        value={modifyHotel.comment}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <ContentEditor
        defaultValue={modifyHotel.contents}
        name="contents"
        onChangeEditor={(value: string) =>
          setModifyHotel({ ...modifyHotel, contents: value })
        }
        label="호텔 상세"
        helpMessage="호텔에 대한 상세내용을 작성해주세요"
      />
      <Spacing size={8} />
      <TextField
        label="호텔가격"
        name="price"
        value={modifyHotel.price}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <Select
        label="등급"
        options={startRatingList}
        name="startRating"
        value={modifyHotel.startRating}
        onChange={handleChange}
      />
      <Spacing size={8} />
      <Map location={modifyHotel.location} setNewLocation={handleLocation} />
      <Spacing size={20} />
      <Text typography="t4" bold={true}>
        호텔사진
      </Text>
      <Spacing size={8} />
      <Flex justify="center" align="center" direction="column">
        <ImageUpload onChangeFile={handleFileChange} />
        <Spacing size={50} />
        <Grid>
          {modifyHotel.images.map((url, index) => (
            <ImageItem
              key={index}
              url={url}
              onDeleteImage={handleDeleteImage}
            />
          ))}
        </Grid>
      </Flex>
      <Spacing size={80} />
      <FixedBottomButton label="수정하기" onClick={handleSubmit} />
    </div>
  );
}

export default ModifyHotel;
