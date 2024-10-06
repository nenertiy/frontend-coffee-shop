import { FC, useState, useEffect } from "react";
import styles from "./FormCategory.module.scss";
import { useQuery } from "@tanstack/react-query";
import { createCategory, fetchSubcategories } from "../../utils/api";
import { useForm } from "react-hook-form";
import CustomMultiselect from "../CustomMultiselect/CustomMultiselect";

const FormCategory: FC = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      subCategoryId: [] as number[],
    },
  });

  interface SelectedState {
    id: number;
    name: string;
  }
  const [selected, setSelected] = useState<SelectedState[]>([]);

  useEffect(() => {
    setValue(
      "subCategoryId",
      selected.map((subcategory) => subcategory.id)
    );
  }, [selected, setValue]);

  const onSubmit = async (data: { name: string; subCategoryId: number[] }) => {
    await createCategory(data);
  };

  const { data } = useQuery({
    queryKey: ["subcategories"],
    queryFn: fetchSubcategories,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Category</div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
          />
        </div>
        <div className={styles.subcategories}>
          <label htmlFor="subcategories">Choose subcategories</label>
          <CustomMultiselect
            data={data}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className={styles.button_container}>
          <button
            className={styles.button}
            type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCategory;
