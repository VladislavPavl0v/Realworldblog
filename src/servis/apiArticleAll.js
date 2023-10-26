/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiArticleAll = createAsyncThunk(
  'blog/apiArticleAll',
  async ({ page = 1, limit = 5 }) => {
    const offset = page * 5.5 - 5;
    try {
      const response = await axios.get(
        `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching article all:', error);
      throw error;
    }
  },
);
