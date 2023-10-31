/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './config';

export const apiArticleDetails = createAsyncThunk('blog/apiArticleDetails', async (slug) => {
    try {
        const response = await axios.get(`${BASE_URL}/articles/${slug}`);
        return response.data;

      } catch (error) {
        console.error('Error fetching article details:', error);
        throw error;
      }
  }); 