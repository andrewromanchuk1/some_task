import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductList.module.css';
import { fetchProductsThunk } from '../../store/products/productsThunk';
import { AppDispatch, RootState } from '../../store';
import ProductItem from '../../components/ProductItem/ProductItem';
import ModalForm from '../../common/ModalForm/ModalForm';
import { InitialProductsStateType } from '../../store/products/productsSlice';
import SelectSort from '../../components/SelectSort/SelectSort';
import type { ProductType } from '../../store/products/types';

type ProductListProps = {};

const ProductList: React.FC<ProductListProps> = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('alphabet');

  const dispatch = useDispatch<AppDispatch>();

  const productsState = useSelector<RootState, InitialProductsStateType>(
    (state) => state.products
  );

  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    const sortedArray = [...productsState.products];
    if (sortCriteria === 'alphabet') {
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedArray.sort((a, b) => b.count - a.count);
    }
    setSortedProducts(sortedArray);
  }, [productsState.products, sortCriteria]);

  const handleSorting = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setModalOpen((prev) => !prev);
  };

  if (productsState.isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }
  if (productsState.isError) {
    return <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
  }

  return (
    <div className={styles.list_container}>
      <ModalForm isOpen={isModalOpen} onCloseModal={handleOpenModal} />
      <div className={styles.add_btn_select_container}>
        <button className={styles.add_btn} onClick={handleOpenModal}>
          Add Product
        </button>
        <SelectSort handleSorting={handleSorting} />
      </div>
      <div className={styles.item_container}>
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
