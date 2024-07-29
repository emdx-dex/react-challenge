import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dropdown } from "./Dropdown";

const meta = {
  component: Dropdown,
  tags: ["autodocs"],
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
    classes: {
      root: "",
      button: {
        root: "",
        open: "",
        label: "",
        placeholder: "",
        caret: "",
      },
      menu: {
        root: "",
        item: "",
      },
    },
    onChange: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
