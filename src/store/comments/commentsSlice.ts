import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from './types';
import {
  addCommentThunk,
  fetchCommentThunk,
  removeCommentThunk,
} from './commentsThunk';

const initialState: CommentType[] = [];

const commentslice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommentThunk.fulfilled,
      (_, action: PayloadAction<CommentType[]>) => action.payload
    );
    builder.addCase(
      addCommentThunk.fulfilled,
      (state, action: PayloadAction<CommentType>) => [...state, action.payload]
    );
    builder.addCase(
      removeCommentThunk.fulfilled,
      (state, action: PayloadAction<CommentType>) =>
        state.filter((comment) => comment.id !== action.payload.id)
    );
  },
});

export default commentslice.reducer;
