import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './config';

export const apiArticleAll = createAsyncThunk(
  'blog/apiArticleAll',
  async ({ page = 1, limit = 5, token }) => {
    try {
      const offset = page * 5.5 - 5;

      const headers = token ? { Authorization: `Token ${token}` } : {};

      const response = await axios.get(
        `${BASE_URL}/articles?limit=${limit}&offset=${offset}`,
        { headers }, 
      );

      return response.data;
    } catch (error) {
      throw new Error('Не удалось загрузить статьи');
    }
  },
);
