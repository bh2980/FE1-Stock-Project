import type { Meta, StoryObj } from "@storybook/react";

import { exceptProperty } from "@utils/utils";

import StoryWrapper from "@story/StoryWrapper";

import Image from "./Image";

const meta = {
  title: "Atom/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  argTypes: exceptProperty([
    "loading",
    "loader",
    "quality",
    "priority",
    "blurDataURL",
    "unoptimized",
    "onLoadingComplete",
    "layout",
    "objectFit",
    "objectPosition",
    "lazyBoundary",
    "lazyRoot",
    "fill",
  ]),
  tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: () => <Image className="w-[200rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />,
};

/**
 * Image는 `w-` 혹은 `h-` class를 통해 크기를 지정할 수 있습니다.
 *
 * **width는 필수로 지정해야합니다 **
 *
 */
export const ImageSize: Story = {
  render: () => (
    <StoryWrapper>
      <Image className="w-[100rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />
      <Image className="w-[200rem] h-[100rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />
    </StoryWrapper>
  ),
};

/**
 * Image는 rounded 속성을 통해 테두리 반경을 조절할 수 있습니다.
 *
 * - `none` : 없음
 * - `xs` : 2px
 * - `s` : 4px
 * - `m` : 8px
 * - `l` : 16px
 * - `circle` : 둥근 테두리
 */
export const ImageRadius: Story = {
  render: () => (
    <StoryWrapper>
      <Image
        rounded="none"
        className="w-[100rem]"
        alt="chistock 이미지"
        src="https://url.kr/kd35ap"
      />
      <Image
        rounded="xs"
        className="w-[100rem]"
        alt="chistock 이미지"
        src="https://url.kr/kd35ap"
      />
      <Image rounded="s" className="w-[100rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />
      <Image rounded="m" className="w-[100rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />
      <Image rounded="l" className="w-[100rem]" alt="chistock 이미지" src="https://url.kr/kd35ap" />
      <Image
        rounded="circle"
        className="w-[100rem]"
        alt="chistock 이미지"
        src="https://url.kr/kd35ap"
      />
    </StoryWrapper>
  ),
};

/**
 * Playground에서 Image 컴포넌트를 직접 테스트해보세요.
 *
 * [Image Playground로 이동](?path=/story/atom-image--playground)
 */
export const Playground: Story = {
  argTypes: {
    src: {
      control: { type: "text" },
    },
  },
  args: {
    className: "w-[100rem]",
    src: "https://url.kr/kd35ap",
    alt: "chistock",
  },
  parameters: { a11y: { disable: true } },
  render: (args) => <Image {...args} />,
};
