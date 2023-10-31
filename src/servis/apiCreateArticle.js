import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiCreateArticle = createAsyncThunk(
  'articles/createNewArticle',
  async ({ newArticleInfo, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles`, {
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
