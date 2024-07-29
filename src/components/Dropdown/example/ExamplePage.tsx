import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Dropdown, type DropdownOption } from "../Dropdown";

export const ExamplePage = () => {
  const [value1, setValue1] = useState<DropdownOption[]>([]);
  const [value2, setValue2] = useState<DropdownOption[]>([]);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Dropdown
        options={[
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
          {
            id: "#4",
            label: "Selecteable Item #4",
          },
        ]}
        value={value1}
        onChange={handleChange(setValue1)}
      />

      <Dropdown
        options={[
          {
            id: "#1",
            label: "Selecteable Item #1",
          },
          {
            id: "#2",
            label: "Selecteable Item #2",
          },
        ]}
        value={value2}
        onChange={handleChange(setValue2)}
      />
    </div>
  );
};

const handleChange = (setFn: Dispatch<SetStateAction<DropdownOption[]>>) => {
  return (option: DropdownOption) => {
    setFn((current) => {
      const isAlreadySelected = !!current.find((v) => v.id === option.id);

      return isAlreadySelected
        ? // Unselect
          current.filter((v) => v.id !== option.id)
        : // Select
          [...current, option];
    });
  };
};
