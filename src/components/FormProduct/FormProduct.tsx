import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { createProduct, fetchSubcategories } from "../../utils/api";

import styles from "./FormProduct.module.scss";

interface FormProductProps {
  onSuccess: () => void;
}

const FormProduct: FC<FormProductProps> = ({ onSuccess }) => {
  interface ProductFormData {
    name: string;
    img: string;
    price: number;
    description: string;
    productCategoryId: number;
  }

  const { data } = useQuery({ queryKey: ["subcategories"], queryFn: fetchSubcategories });
  const { register, handleSubmit, reset } = useForm<ProductFormData>();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price.toString()),
        productCategoryId: parseInt(formData.productCategoryId.toString()),
      };
      await createProduct(productData);
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess();
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
            step="0.1"
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

export default FormProduct;
