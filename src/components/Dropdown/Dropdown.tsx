import { memo, useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useClickOutside } from "../../hooks/useClickOutside";

import "../../styles/reset.css";
import styles from "./dropdown.module.css";

export interface DropdownClasses {
  root?: string;
  button?: {
    root?: string;
    open?: string;
    label?: string;
    placeholder?: string;
    caret?: string;
  };
  menu?: {
    root?: string;
    item?: string;
  };
}

export interface DropdownOption {
  id: string | number;
  label: React.ReactNode;
  name?: string;
  [key: string]: unknown;
}

export interface DropdownProps {
  /**
   * Array of options to be displayed in the dropdown menu.
   * Each option should include a label and a value.
   */
  options: DropdownOption[];
  /**
   * Array of selected options.
   * Each selected option should match the structure of the options array.
   */
  value: DropdownOption[];
  /**
   * Placeholder text displayed when no option is selected.
   */
  placeholder?: string;
  /**
   * The id attribute for the dropdown element.
   */
  id?: string;
  /**
   * The name attribute for the dropdown element.
   */
  name?: string;
  /**
   * Object containing class names for styles customization.
   * - `root`: Root element of the dropdown.
   * - `button`: Object containing class names for the dropdown button and its states.
   *   - `root`: The main button element.
   *   - `open`: Applied when the dropdown is open.
   *   - `label`: The label displayed on the button when an option is selected.
   *   - `placeholder`: The placeholder text displayed when no option is selected.
   *   - `caret`: The caret icon indicating the dropdown state.
   * - `menu`: Object containing class names for the dropdown menu and items.
   *   - `root`: The root element of the dropdown menu.
   *   - `item`: Applied to each dropdown menu item.
   */
  classes?: DropdownClasses;
  /**
   * Callback invoked when an option is selected.
   * It receives the selected option as a parameter.
   */
  onChange?: (option: DropdownOption) => void;
  /**
   * Callback invoked when the dropdown loses focus.
   */
  onBlur?: () => void;
}

export const Dropdown = memo(
  ({
    options,
    value,
    placeholder = "Placeholder",
    id,
    name,
    classes,
    onChange,
    onBlur,
  }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(() => setIsOpen(false), []);

    return (
      <div
        onBlur={onBlur}
        ref={dropdownRef}
        className={classNames(styles.dropdown, classes?.root)}
      >
        <button
          id={id}
          name={name}
          role="combobox"
          aria-label="Toggle dropdown"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={classNames(
            styles.button,
            classes?.button?.root,
            isOpen && [styles.buttonOpen, classes?.button?.open]
          )}
        >
          {value.length ? (
            <div
              className={classNames(styles.buttonLabel, classes?.button?.label)}
            >
              {value.map((v) => v.label).join(", ")}
            </div>
          ) : (
            <div
              className={classNames(
                styles.buttonLabel,
                classes?.button?.label,
                styles.buttonPlaceholder,
                classes?.button?.placeholder
              )}
            >
              {placeholder}
            </div>
          )}

          <div className={classNames(styles.caret, classes?.button?.caret)}>
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
            classes={classes}
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
  classes: DropdownClasses | undefined;
  onClickOutside: () => void;
  onChange?: (option: DropdownOption) => void;
}

const DropdownList = memo(
  ({
    id,
    menuId,
    options,
    value,
    dropdownRef,
    classes,
    onClickOutside,
    onChange,
  }: DropdownListProps) => {
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
          className={classNames(styles.menu, classes?.menu?.root)}
        >
          {options.map((option, i) => (
            <li
              role="option"
              key={`${id}-${i}`}
              className={classNames(styles.menuItem, classes?.menu?.item)}
            >
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
