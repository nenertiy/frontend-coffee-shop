import { FC, useState } from "react";
import styles from "./Product.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../utils/api";
import Modal from "../../components/Modal/Modal";
import FormEditProduct from "../../components/FormProduct/FormEditProduct";

const Product: FC = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
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
              <div className={styles.subtitle}>{data.productCategory.name}</div>
              <div className={styles.description}>{data.description}</div>
            </div>

            <div className={styles.cart}>
              <div className={styles.price}>$ {data.price}</div>
              <div className={styles.size}>500ml</div>
              <div className={styles.button_container}>
                <button className={styles.button}>Add to cart</button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.edit}>
        <button onClick={handleEditClick}>Edit</button>
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
