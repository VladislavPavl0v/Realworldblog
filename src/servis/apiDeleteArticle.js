import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './config';

export const apiDeleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async ({ slug, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      await response.text();
      return slug;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
