import type { Meta, StoryObj } from "@storybook/react";

import BarChart from "./BarChart";

const meta = {
  title: "Atom/BarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof BarChart>;

const data = [
  { year: 2019, value: 151.8 },
  { year: 2020, value: 242.2 },
  { year: 2021, value: 121.3 },
  { year: 2022, value: 196.7 },
  { year: 2023, value: null }, // 값이 아직 없는 경우
];

export const Default: Story = {
  render: () => <BarChart data={data} />,
};
