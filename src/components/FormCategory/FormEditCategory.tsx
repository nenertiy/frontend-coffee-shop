import { FC, useEffect, useState } from "react";
import styles from "./FormEditCategory.module.scss";
import CustomMultiselect from "../CustomMultiselect/CustomMultiselect";
import { useForm } from "react-hook-form";
import { updateCategory } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";

interface Subcategory {
  id: number;
  name: string;
}

interface FormCategoryProps {
  categoryId: number;
  currentName: string;
  subcategories: Subcategory[];
  onClose: () => void;
  onSuccess: () => void;
  allSubcategories: Subcategory[];
}

const FormEditCategory: FC<FormCategoryProps> = ({
  categoryId,
  currentName,
  subcategories,
  onClose,
  onSuccess,
  allSubcategories,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: currentName,
      subCategoryId: subcategories.map((sub) => sub.id),
    },
  });

  const [selectedSubcategories, setSelectedSubcategories] = useState<Subcategory[]>(subcategories);

  const queryClient = useQueryClient();

  useEffect(() => {
    setValue(
      "subCategoryId",
      selectedSubcategories.map((sub) => sub.id)
    );
  }, [selectedSubcategories, setValue]);

  const onSubmit = async (data: { name: string; subCategoryId: number[] }) => {
    try {
      await updateCategory({ name: data.name, subCategoryId: data.subCategoryId }, categoryId);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit Category</div>
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
            data={allSubcategories}
            selected={selectedSubcategories}
            setSelected={setSelectedSubcategories}
          />
        </div>
        <div className={styles.button_container}>
          <button
            className={styles.button}
            type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditCategory;
