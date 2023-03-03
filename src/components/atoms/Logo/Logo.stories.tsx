import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { Logo } from "./Logo.js";
export default {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Logo>;

type ComponentProps = React.ComponentProps<typeof Logo>;

// Create a template for the component
const Template: Story<ComponentProps> = (args) => <Logo {...args} />;

export const Basic: Story<ComponentProps> = Template.bind({});
