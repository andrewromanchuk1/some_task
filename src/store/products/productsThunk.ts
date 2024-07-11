import {
  AsyncThunk,
  createAsyncThunk,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import { api } from '../../api/api';
import type { ProductType } from './types';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export const fetchProductsThunk: AsyncThunk<
  ProductType[],
  void,
  AsyncThunkConfig
> = createAsyncThunk<ProductType[]>('fetchProducts', async () => {
  const response = await api.get('/PRODUCTS');
  return response.data;
});

export const addProductThunk: AsyncThunk<
  ProductType,
  ProductType,
  AsyncThunkConfig
> = createAsyncThunk<ProductType, ProductType>(
  'addProduct',
  async (product) => {
    const response = await api.post('/PRODUCTS', product);
    return response.data;
  }
);

export const removeProductThunk: AsyncThunk<
  ProductType,
  string,
  AsyncThunkConfig
> = createAsyncThunk<ProductType, string>('removeProduct', async (id) => {
  const response = await api.delete(`/PRODUCTS/${id}`);
  return response.data;
});

export const editProductThunk: AsyncThunk<
  ProductType,
  { id: string; product: ProductType },
  AsyncThunkConfig
> = createAsyncThunk<ProductType, { id: string; product: ProductType }>(
  'editProduct',
  async ({ id, product }) => {
    const response = await api.put(`/PRODUCTS/${id}`, product);
    return response.data;
  }
);
