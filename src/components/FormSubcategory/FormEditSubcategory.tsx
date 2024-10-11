import { FC } from "react";
import styles from "./FormEditSubcategory.module.scss";
import { useForm } from "react-hook-form";
import { updateSubcategory } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";

interface FormEditSubcategoryProps {
  currentCategory: {
    id: number;
    name: string;
    img: string;
  };
  categoryId: string | undefined;
  onSuccess: () => void;
  onClose: () => void;
}

const FormEditSubcategory: FC<FormEditSubcategoryProps> = ({
  onClose,
  onSuccess,
  currentCategory,
  categoryId,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentCategory.name,
      img: currentCategory.img,
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: { name: string; img: string }) => {
    try {
      const newData = { ...data };
      await updateSubcategory(newData, currentCategory.id);
      queryClient.invalidateQueries({
        queryKey: ["subcategory", "productsByCategory", categoryId],
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit Subcategory</div>
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
        <div className={styles.img}>
          <label htmlFor="image">Image (url)</label>
          <input
            {...register("img", { required: true })}
            type="url"
            id="image"
          />
        </div>
        <div className={styles.button_container}>
          <button
            type="submit"
            className={styles.button}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditSubcategory;
