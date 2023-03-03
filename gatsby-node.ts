import { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  // add extensionAliases to webpack config

  actions.setWebpackConfig({
    resolve: {
      extensionAlias: {
        ".js": [".ts", ".tsx", ".js"],
      },
    },
  });
};
