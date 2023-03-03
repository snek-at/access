import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; ';

const theme = extendTheme(proTheme, {
  colors: {
    ...baseTheme.colors,
    brand: baseTheme.colors.blue,
  },
  fonts: {
    body: fontFamily,
    heading: fontFamily,
    mono: fontFamily,
  },
  components: {
    Link: {
      baseStyle: {
        color: "blue.500",
        _hover: {
          color: "blue.600",
          textDecoration: "underline",
        },
        _active: {
          color: "blue.700",
        },
      },
      variants: {
        white: {
          color: "white",
          _hover: {
            color: "gray.100",
            textDecoration: "underline",
          },
          _active: {
            color: "gray.200",
          },
        },
        black: {
          color: "black",
          _hover: {
            color: "gray.900",
            textDecoration: "underline",
          },
          _active: {
            color: "blue.700",
          },
        },
      },
    },
  },
});

export default theme;
