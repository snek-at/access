import {
  Flex,
  chakra,
  FlexProps,
  HTMLChakraProps,
  Image,
} from "@chakra-ui/react";

// @ts-ignore
import snekLogoGIF from "./snek-logo.gif";

export interface LogoProps extends FlexProps {}

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Flex {...props}>
      <Image
        objectFit={"contain"}
        src={snekLogoGIF}
        alt="Otter dancing with a fish"
      />
    </Flex>
  );
};
