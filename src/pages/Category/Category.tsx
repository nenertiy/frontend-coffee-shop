import { FC } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSubcategory, fetchProductsByCategory, fetchSubcategory } from "../../utils/api";

import styles from "./Category.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";

const Category: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: products } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => fetchProductsByCategory(id),
  });

  const { data: subcategory } = useQuery({
    queryKey: ["subcategory"],
    queryFn: () => fetchSubcategory(id),
  });

  const handleDelete = (categoryId: string) => {
    deleteSubcategory(categoryId);
    navigate(-1);
    queryClient.invalidateQueries({
      queryKey: ["categories", categoryId],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.title}>{subcategory?.name}</div>
        <div className={styles.bar_container}>
          <button
            className={styles.delete}
            onClick={() => handleDelete(subcategory.id)}>
            Delete
          </button>
          <button
            className={styles.edit}
            // onClick={() => handleEdit(category.id, category.name, category.subCategory)}
          >
            Edit
          </button>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        {products?.map(
          (product: {
            id: string;
            name: string;
            img: string;
            price: number;
            productCategory: { name: string };
          }) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
              category={product?.productCategory?.name}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Category;
