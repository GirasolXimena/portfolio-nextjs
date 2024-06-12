import styles from "./select.module.css";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

const BaseSelect = () => (
  <Select className={styles["react-aria-Select"]}>
    <Label>Favorite Animal</Label>
    <Button className={styles["react-aria-Button"]}>
      <SelectValue className={styles["react-aria-SelectValue"]} />
      <span aria-hidden="true">▼</span>
    </Button>
    <Popover className={styles["react-aria-Popover"]}>
      <ListBox className={styles["react-aria-ListBox"]}>
        <ListBoxItem className={styles["react-aria-ListBoxItem"]}>
          Cat
        </ListBoxItem>
        <ListBoxItem className={styles["react-aria-ListBoxItem"]}>
          Dog
        </ListBoxItem>
        <ListBoxItem className={styles["react-aria-ListBoxItem"]}>
          Kangaroo
        </ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
);

export default BaseSelect;
