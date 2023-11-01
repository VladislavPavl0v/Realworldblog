import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './config';

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async ({slug, token}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
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

export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async ({slug, token}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
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
