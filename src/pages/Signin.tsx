import React from "react";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Spacing } from "../components/shared/Spacing";
import useGoogleSignin from "../hooks/useGoogleSignin";

function Signin() {
  const { signin } = useGoogleSignin();
  return (
    <Flex direction="column" align="center">
      <Spacing size={100} />
      <img
        src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/paper-plane-1-64.png"
        alt=""
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png"
            alt=""
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  );
}

export default Signin;
