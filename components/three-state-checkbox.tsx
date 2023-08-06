import { useRef, useEffect } from "react";

const updateInput = (ref, checked) => {
  const input = ref.current;
  if (input) {
      input.checked = checked;
      input.indeterminate = checked == null;
  }
};

const ThreeStateCheckbox = ({name, checked, onChange, id}) => {
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
    <input
      ref={inputRef}
      id={id}
      type="checkbox"
      name={name}
      onClick={handleClick}
    />
  );
};

export default ThreeStateCheckbox;