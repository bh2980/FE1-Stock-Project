import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "Atom/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "danger", "text"],
      control: { type: "radio" },
    },
    size: {
      options: ["s", "m", "l"],
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "primary",
    size: "m",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonTag: Story = {
  render: (args) => <Button {...args}>LABEL</Button>,
};

export const ATag: Story = {
  args: {
    as: "a",
    href: "https://www.naver.com",
    variant: "primary",
    size: "m",
  },
  render: (args) => <Button {...args}>GO TO NAVER</Button>,
};
