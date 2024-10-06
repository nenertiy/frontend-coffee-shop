import { FC } from "react";
import Modal from "../../components/Modal/Modal";
import { useCreateStore } from "../../store/createStore";
import FormSubcategory from "../../components/FormSubcategory/FormSubcategory";
import FormCategory from "../../components/FormCategory/FormCategory";
import FormProduct from "../../components/FormProduct/FormProduct";

const Modals: FC = () => {
  const subcategoryOpen = useCreateStore((state) => state.subcategoryOpen);
  const subcategoryIsOpen = useCreateStore((state) => state.subcategoryIsOpen);

  const categoryOpen = useCreateStore((state) => state.categoryOpen);
  const categoryIsOpen = useCreateStore((state) => state.categoryIsOpen);

  const productOpen = useCreateStore((state) => state.productOpen);
  const productIsOpen = useCreateStore((state) => state.productIsOpen);

  return (
    <>
      <Modal
        onClose={() => subcategoryOpen()}
        isOpen={subcategoryIsOpen}>
        <FormSubcategory />
      </Modal>
      <Modal
        onClose={() => categoryOpen()}
        isOpen={categoryIsOpen}>
        <FormCategory />
      </Modal>
      <Modal
        onClose={() => productOpen()}
        isOpen={productIsOpen}>
        <FormProduct />
      </Modal>
    </>
  );
};

export default Modals;
