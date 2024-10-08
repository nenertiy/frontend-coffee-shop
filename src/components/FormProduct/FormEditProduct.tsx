import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./FormEditProduct.module.scss";
import { fetchSubcategories, updateProduct } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FormEditProductProps {
  currentProduct: {
    id: number;
    name: string;
    description: string;
    img: string;
    price: number;
    productCategoryId: number;
  };
  productId: string | undefined;
  onSuccess: () => void;
  onClose: () => void;
}

const FormEditProduct: FC<FormEditProductProps> = ({
  currentProduct,
  onSuccess,
  onClose,
  productId,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentProduct.name,
      description: currentProduct.description,
      img: currentProduct.img,
      price: currentProduct.price,
      productCategoryId: currentProduct.productCategoryId,
    },
  });

  const { data } = useQuery({ queryKey: ["categories"], queryFn: fetchSubcategories });
  const queryClient = useQueryClient();

  const onSubmit = async (data: {
    name: string;
    description: string;
    img: string;
    price: number;
    productCategoryId: number;
  }) => {
    try {
      const newData = {
        ...data,
        productCategoryId: Number(data.productCategoryId),
        price: Number(data.price),
      };
      await updateProduct(currentProduct.id, newData);
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit Product</div>
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
          <label htmlFor="img">Img (URL)</label>
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
            step="0.01"
            id="price"
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="category">Category</label>
          <select {...register("productCategoryId", { required: true })}>
            {data?.map((el: { name: string; id: number }) => (
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;
