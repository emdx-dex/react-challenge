import { memo, useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface DropdownOption {
  id: string | number;
  label: React.ReactNode;
  name?: string;
  [key: string]: unknown;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: DropdownOption[];
  placeholder?: string;
  id?: string;
  name?: string;
  onChange?: (option: DropdownOption) => void;
  onBlur?: () => void;
}

export const Dropdown = memo<DropdownProps>(
  ({
    options,
    value,
    placeholder = "Placeholder",
    id,
    name,
    onChange,
    onBlur,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(() => setIsOpen(false), []);

    return (
      <div onBlur={onBlur} ref={dropdownRef} style={{ background: "orange" }}>
        <button
          id={id}
          name={name}
          role="combobox"
          aria-label="Toggle dropdown"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {value.length ? (
            value.map((v) => v.label).join(", ")
          ) : (
            <span style={{ color: "grey" }}>{placeholder}</span>
          )}
        </button>
        {isOpen && (
          <DropdownList
            id={id}
            menuId={id ? `${id}-menu` : undefined}
            options={options}
            value={value}
            dropdownRef={dropdownRef}
            onClickOutside={handleClickOutside}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
);

// Created a separate component DropdownList, to avoid subscribing multiple "mousedown" listeners (useClickOutside)
// in case multiple Dropdowns are rendered at the same time and the list is not open.

interface DropdownListProps {
  id: string | undefined;
  menuId: string | undefined;
  options: DropdownOption[];
  value: DropdownOption[];
  dropdownRef: React.RefObject<HTMLElement>;
  onClickOutside: () => void;
  onChange?: (option: DropdownOption) => void;
}

const DropdownList = memo<DropdownListProps>(
  ({ id, menuId, options, value, dropdownRef, onClickOutside, onChange }) => {
    useClickOutside({
      ref: dropdownRef,
      handler: onClickOutside,
    });

    return (
      <div aria-label="Dropdown menu">
        <ul
          role="listbox"
          id={menuId}
          aria-labelledby={id}
          aria-orientation="vertical"
        >
          {options.map((option, i) => (
            <li role="option" key={`${id}-${i}`}>
              <label>
                {option.label}
                <input
                  type="checkbox"
                  name={option.name}
                  checked={!!value.find((v) => v.id === option.id)}
                  onChange={() => onChange?.(option)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
