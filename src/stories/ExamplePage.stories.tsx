import type { Meta, StoryObj } from "@storybook/react";

import { ExamplePage } from "./ExamplePage";

const meta = {
  component: ExamplePage,
  tags: ["autodocs"],
} satisfies Meta<typeof ExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
