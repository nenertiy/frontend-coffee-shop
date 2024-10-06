import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { createProduct, fetchSubcategories } from "../../utils/api";

import styles from "./FormProduct.module.scss";

const FormProduct: FC = () => {
  interface ProductFormData {
    name: string;
    img: string;
    price: number;
    description: string;
    productCategoryId: number;
  }

  const { data } = useQuery({ queryKey: ["subcategories"], queryFn: fetchSubcategories });
  const { register, handleSubmit } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price.toString()),
      productCategoryId: parseInt(data.productCategoryId.toString()),
    };
    createProduct(productData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Product</div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="description">Description</label>
          <input
            {...register("description", { required: true })}
            type="text"
            id="description"
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="img">Img (url)</label>
          <input
            {...register("img", { required: true })}
            type="url"
            id="img"
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="price">Price (dollars)</label>
          <input
            {...register("price", { required: true })}
            type="number"
            id="price"
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="category">Category</label>
          <select {...register("productCategoryId", { required: true })}>
            {data?.map((el: { id: number; name: string }) => (
              <option
                value={el.id}
                key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.button_container}>
          <button className={styles.button}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
