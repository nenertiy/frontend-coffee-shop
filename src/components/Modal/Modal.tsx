import { FC } from "react";

import iconClose from "../../assets/img/close.svg";
import styles from "./Modal.module.scss";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_wrapper}>
            <div className={styles.modal_content}>
              <button
                onClick={onClose}
                className={styles.modal_close_button}>
                <img
                  src={iconClose}
                  alt=""
                />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
