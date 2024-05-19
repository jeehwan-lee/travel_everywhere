import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { typographyMap } from "../../styles/typography";
import Text from "../shared/Text";

function Contents({ contents }: { contents: string }) {
  return (
    <ContainerStyles>
      <Text bold={true} typography="t4">
        호텔소개
      </Text>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{contents}</ReactMarkdown>
    </ContainerStyles>
  );
}

const ContainerStyles = styled.div`
  padding: 24px;
  ${typographyMap.t6};

  h2 {
    ${typographyMap.t4}
    font-weight : bold;
    margin: 18px 0;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export default Contents;
