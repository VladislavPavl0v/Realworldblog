import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './config';

export const apiCreateArticle = createAsyncThunk(
  'articles/createNewArticle',
  async ({ newArticleInfo, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: newArticleInfo,
        }),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
