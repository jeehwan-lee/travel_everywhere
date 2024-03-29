import qs from "qs";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import Text from "../components/shared/Text";

function ReservationDone() {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string;
  };

  const navigate = useNavigate();

  return (
    <div>
      <Spacing size={80} />
      <Flex direction="column" align="center">
        <img
          src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-3-1/128/049_airplane_transport_clouds_fly_flight-128.png"
          alt=""
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text>{hotelName}</Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: "24px" }}>
        <Button.Group>
          <Button onClick={() => navigate("/")}>홈으로</Button>
          <Button onClick={() => navigate("/reservation/list")}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}

export default ReservationDone;
