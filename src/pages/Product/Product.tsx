import { FC, useState } from "react";
import styles from "./Product.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, deleteProduct, fetchProduct } from "../../utils/api";
import Modal from "../../components/Modal/Modal";
import FormEditProduct from "../../components/FormProduct/FormEditProduct";
import { useAuthStore } from "../../store/authStore";

const Product: FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const userId = useAuthStore((state) => state.userId);

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
    navigate(-1);
    queryClient.invalidateQueries({
      queryKey: ["products", productId],
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
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
    <div>
      <div className={styles.container}>
        {isSuccess && (
          <>
            <div className={styles.img}>
              <img
                src={data.img}
                alt={data.name}
              />
            </div>
            <div className={styles.container_description}>
              <div className={styles.title}>{data.name}</div>
              <div className={styles.subtitle}>{data.productCategory?.name}</div>
              <div className={styles.description}>{data.description}</div>
            </div>

            <div className={styles.cart}>
              <div className={styles.price}>$ {data.price}</div>
              {/* <div className={styles.size}>500ml</div> */}
              <div className={styles.button_container}>
                <button
                  className={styles.button}
                  onClick={handleAddToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => handleDelete(data.id)}
          className={styles.delete}>
          Delete
        </button>
        <button
          onClick={handleEditClick}
          className={styles.edit}>
          Edit
        </button>
      </div>

      {isEditing && (
        <Modal
          onClose={handleCloseModal}
          isOpen={isEditing}>
          <FormEditProduct
            productId={id}
            currentProduct={data}
            onSuccess={() => {
              setIsEditing(false);
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Product;
