import React, { useEffect } from 'react';
import styles from '../ProductView/ProductView.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { InitialProductsStateType } from '../../store/products/productsSlice';
import { fetchProductsThunk } from '../../store/products/productsThunk';
import ProductItem from '../../components/ProductItem/ProductItem';
import { CommentType } from '../../store/comments/types';
import { fetchCommentThunk } from '../../store/comments/commentsThunk';

type ProductViewProps = {};

const ProductView: React.FC<ProductViewProps> = () => {
  const productsState = useSelector<RootState, InitialProductsStateType>(
    (state) => state.products
  );
  const commentstate = useSelector<RootState, CommentType[]>(
    (state) => state.comment
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCommentThunk());
  }, [dispatch]);

  if (productsState.isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }
  if (productsState.isError) {
    return <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
  }

  return (
    <div className={styles.view_container}>
      {productsState.products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          comments={commentstate}
          view
        />
      ))}
    </div>
  );
};

export default ProductView;
