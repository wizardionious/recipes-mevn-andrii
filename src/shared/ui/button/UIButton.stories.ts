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
  play: async ({ args, canvas, userEvent, step }) => {
    const button = canvas.getByTestId("ui-button");

    await step(
      "Tab переводить фокус на кнопку",
      async () => {
        await userEvent.tab();
        await expect(button).toHaveFocus();
      },
    );

    await step("Enter активує кнопку", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step("Пробіл активує кнопку", async () => {
      await userEvent.keyboard(" ");
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });

    await step(
      "Клік мишею викликає onClick рівно один раз",
      async () => {
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalledTimes(1);
      },
    );
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    type: "button",
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

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
    disabled: true,
  },
  play: async ({ args, canvas, userEvent, step }) => {
    const button = canvas.getByRole("button", {
      name: /click me/i,
    });

    await step(
      "Кнопка має нативний атрибут disabled",
      async () => {
        await expect(button).toBeDisabled();
      },
    );

    await step(
      "Disabled-кнопка не отримує фокус через Tab",
      async () => {
        await userEvent.tab();
        await expect(button).not.toHaveFocus();
      },
    );

    await step("Клік не викликає onClick", async () => {
      await userEvent.click(button);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "button",
    loading: true,
  },
  play: async ({ args, canvas, userEvent, step }) => {
    const button = canvas.getByRole("button", {
      name: /click me/i,
    });

    await step(
      "Loading робить кнопку недоступною",
      async () => {
        await expect(button).toBeDisabled();
        await expect(button).toHaveClass(
          "ui-button--loading",
        );
      },
    );

    await step(
      "Показано індикатор завантаження",
      async () => {
        const loader = button.querySelector(
          ".ui-button__loader",
        );
        await expect(loader).not.toBeNull();
      },
    );

    await step(
      "Кнопку не можна сфокусувати чи активувати",
      async () => {
        await userEvent.tab();
        await expect(button).not.toHaveFocus();
        await expect(args.onClick).not.toHaveBeenCalled();
      },
    );
  },
};
