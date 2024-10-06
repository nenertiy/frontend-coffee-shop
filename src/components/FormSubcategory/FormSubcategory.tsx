import { FC } from "react";

import styles from "./FormSubcategory.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { createSubcategory } from "../../utils/api";

const FormSubcategory: FC = () => {
  interface SubcategoryFormData {
    name: string;
    img: string;
  }

  const { register, handleSubmit } = useForm<SubcategoryFormData>();

  const onSubmit: SubmitHandler<SubcategoryFormData> = (data) => createSubcategory(data);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Subcategory</div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
          />
        </div>
        <div className={styles.img}>
          <label htmlFor="image">Image (url)</label>
          <input
            {...register("img")}
            type="url"
            id="image"
          />
        </div>
        <div className={styles.button_container}>
          <button className={styles.button}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default FormSubcategory;
