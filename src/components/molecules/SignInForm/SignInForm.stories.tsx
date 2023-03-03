import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { SignInForm } from "./SignInForm.js";
export default {
  title: "Molecules/SignInForm",
  component: SignInForm,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SignInForm>;

type ComponentProps = React.ComponentProps<typeof SignInForm>;

// Create a template for the component
const Template: Story<ComponentProps> = (args) => <SignInForm {...args} />;

export const Basic: Story<ComponentProps> = Template.bind({});

Basic.args = {
  onSubmit: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  },
};
