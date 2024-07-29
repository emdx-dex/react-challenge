import { memo, useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useClickOutside } from "../../hooks/useClickOutside";

import styles from "./dropdown.module.css";

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
      <div onBlur={onBlur} ref={dropdownRef} className={styles.dropdown}>
        <button
          id={id}
          name={name}
          role="combobox"
          aria-label="Toggle dropdown"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={classNames(styles.button, { [styles.buttonOpen]: isOpen })}
        >
          {value.length ? (
            <div className={styles.buttonLabel}>
              {value.map((v) => v.label).join(", ")}
            </div>
          ) : (
            <div
              className={classNames(
                styles.buttonLabel,
                styles.buttonPlaceholder
              )}
            >
              {placeholder}
            </div>
          )}

          <div className={styles.caret}>
            {isOpen ? (
              <IoChevronUp size="1rem" />
            ) : (
              <IoChevronDown size="1rem" />
            )}
          </div>
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
          className={styles.menu}
        >
          {options.map((option, i) => (
            <li role="option" key={`${id}-${i}`} className={styles.menuItem}>
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
