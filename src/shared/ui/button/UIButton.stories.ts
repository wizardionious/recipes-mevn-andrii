import type { Meta, StoryObj } from "@storybook/vue3-vite";
import UIButton from "./UIButton.vue";
import { expect, fn } from "storybook/test";

type ButtonArgs = InstanceType<
  typeof UIButton
>["$props"] & { onClick?: (event: MouseEvent) => void };

const meta = {
  title: "UI/Button",
  component: UIButton,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  render: (args) => ({
    components: { UIButton },
    setup() {
      return { args };
    },
    template: `
    <UIButton v-bind="args">
      <span>Click me!</span>
    </UIButton>`,
  }),
} satisfies Meta<ButtonArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    type: "button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByTestId("ui-button");
    await userEvent.click(button);

    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
    loading: true,
  },
};

export const ClickFires: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByTestId("ui-button");

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    type: "button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    size: "md",
    type: "button",
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    components: { UIButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 12px;">
        <UIButton v-bind="args" variant="primary">Primary</UIButton>
        <UIButton v-bind="args" variant="secondary">Secondary</UIButton>
        <UIButton v-bind="args" variant="ghost">Ghost</UIButton>
        <UIButton v-bind="args" variant="danger">Danger</UIButton>
      </div>
      `,
  }),
};
