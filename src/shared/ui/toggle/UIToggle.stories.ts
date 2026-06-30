import type { StoryObj, Meta } from "@storybook/vue3-vite";
import UIToggle from "./UIToggle.vue";
import { fn } from "storybook/test";

const meta = {
  title: "UI/Toggle",
  component: UIToggle,
  tags: ["autodocs"],
  args: { onToggle: fn() },
} satisfies Meta<typeof UIToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "test",
    size: "md",
    modelValue: false,
  },
};

export const Small: Story = {
  args: {
    label: "test",
    size: "sm",
    modelValue: false,
  },
};
