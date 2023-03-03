import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { Auth } from "./Auth.js";
export default {
  title: "Organisms/Auth",
  component: Auth,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Auth>;

type ComponentProps = React.ComponentProps<typeof Auth>;

// Create a template for the component
const Template: Story<ComponentProps> = (args) => <Auth {...args} />;

export const Basic: Story<ComponentProps> = Template.bind({});
Basic.args = {
  isSignedIn: false,
  me: undefined,
};

export const SignedIn: Story<ComponentProps> = Template.bind({});
SignedIn.args = {
  isSignedIn: true,
  me: {
    users: [
      {
        user: {
          id: "90ce0b14-fecd-478c-a612-a671797b627c",
          username: "schettn",
          primaryEmail: "schett@snek.at",
          resource: {
            id: "0dfca461-e7a0-4846-bcb4-1aac2265f52c",
            name: "Ballons & Ballons",
          },
        },
      },
    ],
  },
};

export const OngoingAuthentication: Story<ComponentProps> = Template.bind({});
OngoingAuthentication.args = {
  isSignedIn: true,
  me: SignedIn.args.me,
  ongoingAuthentication: {
    resource: {
      id: "0dfca461-e7a0-4846-bcb4-1aac2265f52c",
      name: "Ballons & Ballons",
    },
  },
};

export const OngoingAuthenticationWithoutSignin: Story<ComponentProps> =
  Template.bind({});

OngoingAuthenticationWithoutSignin.args = {
  isSignedIn: false,
  ongoingAuthentication: OngoingAuthentication.args.ongoingAuthentication,
  onSignIn: async (username, password, resourceId) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (username === "schettn" && password === "ciscocisco") {
      return true;
    }

    return false;
  },
};

export const IsLoading: Story<ComponentProps> = Template.bind({});
IsLoading.args = {
  isLoading: true,
};
