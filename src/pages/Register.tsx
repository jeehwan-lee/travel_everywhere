import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FixedBottomButton from "../components/shared/FixedBottomButton";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { TextField } from "../components/shared/TextField";
import { Hotel } from "../models/hotel";
import { RegisterHotel } from "../models/register";
import { registerHotel } from "../remote/register";

function Register() {
  const navigate = useNavigate();

  const [newHotel, setNewHotel] = useState<RegisterHotel>({
    comment: "",
    contents: "",
    name: "",
    price: 0,
    startRating: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await registerHotel(newHotel);
    navigate(`/`);
  };

  return (
    <div>
      <Spacing size={8} backgroundColor="gray100" />
      <div style={{ padding: 24 }}>
        <Text bold={true}>호텔정보</Text>
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
        <TextField
          label="호텔상세"
          name="contents"
          value={newHotel.contents}
          onChange={handleChange}
        />
        <Spacing size={8} />
        <TextField
          label="호텔가격"
          name="price"
          value={newHotel.price}
          onChange={handleChange}
        />
        <Spacing size={8} />
        <TextField
          label="등급"
          name="startRating"
          value={newHotel.startRating}
          onChange={handleChange}
        />
        <FixedBottomButton label="등록하기" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Register;
