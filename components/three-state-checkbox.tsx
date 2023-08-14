import { useRef, useEffect } from "react";

const updateInput = (ref, checked) => {
  const input = ref.current;
  if (input) {
      input.checked = checked;
      input.indeterminate = checked == null;
  }
};

const ThreeStateCheckbox = ({name, checked, onChange, id, label, className, children}) => {
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
      id={id}
      name={name}
      data-label={label}
      className={className}
      onClick={handleClick}
    >{ children } </button>
  );
};

export default ThreeStateCheckbox;