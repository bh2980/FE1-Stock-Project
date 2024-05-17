import type { Meta, StoryObj } from "@storybook/react";

import BarChart from "./BarChart";

const meta = {
  title: "molecules/BarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof BarChart>;

const data = [
  { label: 2019, value: 151.8 },
  { label: 2020, value: 242.2 },
  { label: 2021, value: 121.3 },
  { label: 2022, value: 200.7 },
  { label: 2023, value: null }, // 값이 아직 없는 경우
];

export const Default: Story = {
  render: () => <BarChart width={400} height={300} data={data} />,
};
