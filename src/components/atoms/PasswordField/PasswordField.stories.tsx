import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { PasswordField } from "./PasswordField.js";
export default {
  title: "Atoms/PasswordField",
  component: PasswordField,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PasswordField>;

type ComponentProps = React.ComponentProps<typeof PasswordField>;

// Create a template for the component
const Template: Story<ComponentProps> = (args) => <PasswordField {...args} />;

export const Basic: Story<ComponentProps> = Template.bind({});
