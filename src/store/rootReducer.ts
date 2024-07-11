import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';
import commentslice from './comments/commentsSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  comment: commentslice,
});

export default rootReducer;
