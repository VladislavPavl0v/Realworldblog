import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiArticleDetails = createAsyncThunk('blog/apiArticleDetails', async (slug) => {
    try {
        const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
        return response.data;

      } catch (error) {
        console.error('Error fetching article details:', error);
        throw error;
      }
  }); 