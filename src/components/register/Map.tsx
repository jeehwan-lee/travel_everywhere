import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState } from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function Map() {
  const [location, setLocation] = useState<any>(null);

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
        기본정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "500px",
          margin: "16px 0",
          boxSizing: "border-box",
        }}
        center={{
          lat: 37.715133,
          lng: 126.734086,
        }}
        zoom={15}
        onClick={(e) =>
          setLocation({ lat: e.latLng?.lat(), lng: e.latLng?.lng() })
        }
      >
        {location && (
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        )}
      </GoogleMap>
    </Flex>
  );
}

export default Map;
