import React, { useState } from 'react';
import type { ProductType } from '../../store/products/types';
import styles from './ProductItem.module.css';
import editIcon from '../../assets/edit_icon.svg';
import deleteIcon from '../../assets/trash_icon.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { removeProductThunk } from '../../store/products/productsThunk';
import ModalConfirm from '../../common/ModalConfirm/ModalConfirm';
import ModalForm from '../../common/ModalForm/ModalForm';
import { CommentType } from '../../store/comments/types';
import Comments from '../Comments/Comments';

type ProductItemProps = {
  product: ProductType;
  comments?: CommentType[];
  view?: boolean;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  view,
  comments,
}) => {
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const hanleRemoveProduct = (id: string) => {
    dispatch(removeProductThunk(id));
  };

  const handleCloseDeleteModal = () => {
    setRemoveModalOpen(false);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className={styles.item_container}>
      <ModalConfirm
        isOpen={isRemoveModalOpen}
        onCloseModal={handleCloseDeleteModal}
        hanleRemoveProduct={() => hanleRemoveProduct(product.id)}
      />
      <ModalForm
        isOpen={isEditModalOpen}
        onCloseModal={handleCloseEditModal}
        filledForm={{
          id: product.id,
          name: product.name,
          count: String(product.count),
          weight: product.weight,
          height: String(product.size.height),
          width: String(product.size.width),
        }}
      />
      <div className={styles.item_property_container}>
        <span>Name: </span>
        <span>{product.name}</span>
      </div>
      {view && (
        <div>
          <div className={styles.item_property_container}>
            <span>Count: </span>
            <span>{product.count}</span>
          </div>
          <div className={styles.item_property_container}>
            <span>Heigth: </span>
            <span>{product.size.height}</span>
          </div>
          <div className={styles.item_property_container}>
            <span>Width: </span>
            <span>{product.size.width}</span>
          </div>
          <div className={styles.item_property_container}>
            <span>Weight: </span>
            <span>{product.weight}</span>
          </div>
          {view && <Comments comments={comments!} productId={product.id} />}
        </div>
      )}
      <div className={styles.item_buttons_container}>
        {view && (
          <button
            className={styles.item_buttons}
            onClick={() => setEditModalOpen(true)}
          >
            <img src={editIcon} alt="edit icon" />
          </button>
        )}
        <button
          className={styles.item_buttons}
          onClick={() => setRemoveModalOpen(true)}
        >
          <img
            src={deleteIcon}
            alt="delete icon"
            style={{ backgroundColor: 'red' }}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
