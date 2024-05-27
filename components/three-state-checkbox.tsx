import { useRef, useEffect, ButtonHTMLAttributes, ReactNode } from "react";

type ThreeStateCheckboxProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  children: ReactNode;
  checked: boolean | null;
  label: string;
  onChange: any;
};

const updateInput = (ref, checked) => {
  const input = ref.current;
  if (input) {
    input.checked = checked;
    input.indeterminate = checked == null;
  }
};

const ThreeStateCheckbox = ({
  children,
  checked,
  onChange,
  label,
  ...props
}: ThreeStateCheckboxProps) => {
  const inputRef = useRef(null);
  const checkedRef = useRef(checked);
  useEffect(() => {
    checkedRef.current = checked;
    updateInput(inputRef, checked);
  }, [checked]);
  const handleClick = () => {
    switch (checkedRef.current) {
      case true:
        checkedRef.current = false;
        break;
      case false:
        checkedRef.current = null;
        break;
      default: // null
        checkedRef.current = true;
        break;
    }
    updateInput(inputRef, checkedRef.current);
    if (onChange) {
      onChange(checkedRef.current);
    }
  };
  return (
    <button
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      ref={inputRef}
      data-label={label}
      {...props}
      onClick={handleClick}
    >
      {children}{" "}
    </button>
  );
};

export default ThreeStateCheckbox;
