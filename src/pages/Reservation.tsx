import { parse } from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/reservation/Form";
import useReservation from "../components/reservation/hooks/useReservation";
import Summary from "../components/reservation/Summary";
import FixedBottomButton from "../components/shared/FixedBottomButton";
import Select from "../components/shared/Select";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";
import { TextField } from "../components/shared/TextField";
import useUser from "../hooks/auth/userUser";
import { makeReservation } from "../remote/reservation";
import { addDelimiter } from "../utils/addDelimiter";

interface formValuesProps {
  name: string;
  phone: string;
  email: string;
  isSmoke: string;
  special_request?: string;
}

function Reservation() {
  const user = useUser();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<formValuesProps>({
    name: "",
    phone: "",
    email: "",
    isSmoke: "금연",
    special_request: "",
  });

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

  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true }
  ) as {
    startDate: string;
    endDate: string;
    nights: string;
    roomId: string;
    hotelId: string;
  };

  const { data, isLoading } = useReservation({ hotelId, roomId });

  if (data == null || isLoading) {
    return null;
  }

  const { room, hotel } = data;

  const handleFormValues = (e: { target: { name: any; value: any } }) => {
    console.log(e.target.value);

    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (formValues: formValuesProps) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };

    const reservationId = await makeReservation(newReservation);

    navigate(`/reservation/done?reservationId=${reservationId}`);
  };

  const buttonLabel = `${nights}박 ${addDelimiter(
    room.price * Number(nights)
  )}원 예약하기`;

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      {/* <Form
        buttonLabel={buttonLabel}
        onSubmit={handleSubmit}
        forms={hotel.forms}
      /> */}
      <div style={{ padding: 24 }}>
        <Text bold={true}>예약정보</Text>
        <Spacing size={16} />
        <TextField
          label="한글명"
          name="name"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          label="전화번호"
          name="phone"
          value={formValues.phone}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          label="이메일"
          name="email"
          value={formValues.email}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Select
          label="흡연여부"
          name="smoke"
          options={smokeList}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          label="요청사항"
          name="special_request"
          value={formValues.special_request}
          helpMessage="요청사항은 모두 전달되나 현지 숙소 사정에 따라 반영되지 않을 수 있습니다."
          onChange={handleFormValues}
        />
        <Spacing size={80} />
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => {
            handleSubmit(formValues);
          }}
        />
      </div>
    </div>
  );
}

export default Reservation;
