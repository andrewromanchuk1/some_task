import { Modal } from '@mui/material';
import React from 'react';
import styles from './ModalConfirm.module.css';

type ModalConfirmProps = {
  isOpen: boolean;
  onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  hanleRemoveProduct: () => void;
};

const ModalConfirm: React.FC<ModalConfirmProps> = React.forwardRef(
  ({ isOpen, onCloseModal, hanleRemoveProduct }, ref) => {
    return (
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <div
          ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
          className={styles.modal_confirm_container}
        >
          <p className={styles.modal_confirm_paragraph}>
            Are you sure you want to remove this product?
          </p>
          <div className={styles.modal_confirm_btn_container}>
            <button className={styles.modal_confirm_btn} onClick={onCloseModal}>
              No
            </button>
            <button
              style={{ backgroundColor: 'rgb(0, 184, 0)' }}
              className={styles.modal_confirm_btn}
              onClick={hanleRemoveProduct}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ModalConfirm;
