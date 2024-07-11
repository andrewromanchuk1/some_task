import {
  AsyncThunk,
  createAsyncThunk,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import { CommentType } from './types';
import { api } from '../../api/api';

type AsyncThunkConfig = {
  state?: CommentType[];
  dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export const fetchCommentThunk: AsyncThunk<
  CommentType[],
  void,
  AsyncThunkConfig
> = createAsyncThunk<CommentType[]>('fetchComment', async () => {
  const response = await api.get('/COMMENTS');
  return response.data;
});

export const addCommentThunk: AsyncThunk<
  CommentType,
  CommentType,
  AsyncThunkConfig
> = createAsyncThunk<CommentType, CommentType>(
  'addComment',
  async (comment) => {
    const response = await api.post(`/COMMENTS`, comment);
    return response.data;
  }
);
export const removeCommentThunk: AsyncThunk<
  CommentType,
  string,
  AsyncThunkConfig
> = createAsyncThunk<CommentType, string>('removeComment', async (id) => {
  const response = await api.delete(`/COMMENTS/${id}`);
  return response.data;
});
