import type { Meta, StoryObj } from "@storybook/react";

import { ExamplePage } from "./ExamplePage";

const meta = {
  title: "Components/Dropdown/Example",
  component: ExamplePage,
} satisfies Meta<typeof ExamplePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
