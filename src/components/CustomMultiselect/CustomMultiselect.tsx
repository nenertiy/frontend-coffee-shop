import { FC } from "react";
import styles from "./CustomMultiselect.module.scss";

interface Subcategory {
  id: number;
  name: string;
}

interface CustomMultiselectProps {
  data: Subcategory[];
  selected: Subcategory[];
  setSelected: (subcategories: Subcategory[]) => void;
}

const CustomMultiselect: FC<CustomMultiselectProps> = ({ data, selected, setSelected }) => {
  const handleSelect = (subcategory: Subcategory) => {
    if (selected.find((item) => item.id === subcategory.id)) {
      setSelected(selected.filter((item) => item.id !== subcategory.id));
    } else {
      setSelected([...selected, subcategory]);
    }
  };

  return (
    <div className={styles.container}>
      {data.map((subcategory) => (
        <div
          key={subcategory.id}
          className={styles.item}>
          <label>
            <input
              type="checkbox"
              checked={selected.some((item) => item.id === subcategory.id)}
              onChange={() => handleSelect(subcategory)}
            />
            {subcategory.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CustomMultiselect;
