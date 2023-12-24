import Flex from "./Flex";
import { Spacing } from "./Spacing";
import Text from "./Text";

function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text typography="t4" bold={true}>
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default FullPageLoader;
