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
import { RegisterHotel } from "../models/register";
import { PiImagesThin } from "react-icons/pi";
import UploadImageItem from "../components/register/UploadImageItem";
import Grid from "../components/shared/Grid";

function Register() {
  const navigate = useNavigate();

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

  const [newHotel, setNewHotel] = useState<RegisterHotel>({
    comment: "",
    contents: "",
    name: "",
    price: 0,
    startRating: 5,
    location: { x: 0, y: 0 },
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
    console.log(newHotel);
    //await registerHotel(newHotel);
    //navigate(`/`);
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
      <Flex justify="center" align="center" direction="column">
        <Flex
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
        <Spacing size={50} />
        <Grid>
          <UploadImageItem />
          <UploadImageItem />
          <UploadImageItem />
          <UploadImageItem />
        </Grid>
      </Flex>
      <Spacing size={80} />
      <FixedBottomButton label="등록하기" onClick={handleSubmit} />
    </div>
  );
}

export default Register;
