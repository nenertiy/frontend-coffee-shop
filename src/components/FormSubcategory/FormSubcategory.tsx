import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSubcategory } from "../../utils/api";

import styles from "./FormSubcategory.module.scss";

interface FormSubcategoryProps {
  onSuccess: () => void;
}

const FormSubcategory: FC<FormSubcategoryProps> = ({ onSuccess }) => {
  interface SubcategoryFormData {
    name: string;
    img: string;
  }

  const { register, handleSubmit, reset } = useForm<SubcategoryFormData>();

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    try {
      await createSubcategory({ name: data.name, img: data.img });
      reset();
      onSuccess();
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Subcategory</div>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSubcategory;
