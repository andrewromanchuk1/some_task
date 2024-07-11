import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from './types';
import {
  addProductThunk,
  editProductThunk,
  fetchProductsThunk,
  removeProductThunk,
} from './productsThunk';

export type InitialProductsStateType = {
  products: ProductType[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialProductsStateType = {
  products: [],
  isError: false,
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.rejected, (state) => ({
      ...state,
      isLoading: false,
      isError: true,
    }));
    builder.addCase(fetchProductsThunk.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(
      fetchProductsThunk.fulfilled,
      (state, action: PayloadAction<ProductType[]>) => ({
        ...state,
        products: action.payload,
        isLoading: false,
      })
    );
    builder.addCase(
      addProductThunk.fulfilled,
      (state, action: PayloadAction<ProductType>) => ({
        ...state,
        products: [...state.products, action.payload],
      })
    );
    builder.addCase(
      removeProductThunk.fulfilled,
      (state, action: PayloadAction<ProductType>) => ({
        ...state,
        products: state.products.filter((el) => el.id !== action.payload.id),
      })
    );
    builder.addCase(
      editProductThunk.fulfilled,
      (state, action: PayloadAction<ProductType>) => ({
        ...state,
        products: state.products.map((el) =>
          el.id === action.payload.id ? action.payload : el
        ),
      })
    );
  },
});

export default productsSlice.reducer;
