import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { HotelRegister } from "../../models/register";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function Map({
  location,
  setNewLocation,
}: {
  location: HotelRegister["location"];
  setNewLocation: (e: any) => void;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API as string,
  });

  if (isLoaded === false) {
    return null;
  }

  return (
    <Flex direction="column" style={{ paddingTop: "24px" }}>
      <Text typography="t4" bold={true}>
        위치정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "500px",
          margin: "16px 0",
          boxSizing: "border-box",
        }}
        center={{
          lat: location.x,
          lng: location.y,
        }}
        zoom={15}
        onClick={setNewLocation}
      >
        {location && <Marker position={{ lat: location.x, lng: location.y }} />}
      </GoogleMap>
    </Flex>
  );
}

export default Map;
