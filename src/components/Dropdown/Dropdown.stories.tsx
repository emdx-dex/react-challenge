import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dropdown } from "./Dropdown";

const meta = {
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        id: "#1",
        label: "Selecteable Item #1",
      },
      {
        id: "#2",
        label: "Selecteable Item #2",
      },
      {
        id: "#3",
        label: "Selecteable Item #3",
      },
    ],
    value: [],
    onChange: fn(),
    onBlur: fn(),
  },
};