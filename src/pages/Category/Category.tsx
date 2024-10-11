import { FC, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  deleteSubcategory,
  fetchProductsByCategory,
  fetchSubcategory,
} from "../../utils/api";

import styles from "./Category.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Modal from "../../components/Modal/Modal";
import FormEditSubcategory from "../../components/FormSubcategory/FormEditSubcategory";
import { useAuthStore } from "../../store/authStore";

const Category: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const isAdmin = useAuthStore((state) => state.isAdmin);
  const userId = useAuthStore((state) => state.userId);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = (categoryId: string | undefined) => {
    setIsEditing(false);
    queryClient.invalidateQueries({
      queryKey: ["category", categoryId],
    });
  };

  const handleDelete = (categoryId: string) => {
    deleteSubcategory(categoryId);
    navigate(-1);
    queryClient.invalidateQueries({
      queryKey: ["categories", categoryId],
    });
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(Number(userId), Number(id));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.title}>{subcategory?.name}</div>
        {isAdmin && (
          <div className={styles.bar_container}>
            <button
              className={styles.delete}
              onClick={() => handleDelete(subcategory.id)}>
              Delete
            </button>
            <button
              className={styles.edit}
              onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
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
              handleAddToCart={handleAddToCart}
            />
          )
        )}
      </div>

      {isEditing && (
        <Modal
          onClose={() => handleCloseModal(id)}
          isOpen={isEditing}>
          <FormEditSubcategory
            currentCategory={subcategory}
            categoryId={id}
            onSuccess={() => {
              setIsEditing(false);
            }}
            onClose={() => handleCloseModal(id)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Category;
