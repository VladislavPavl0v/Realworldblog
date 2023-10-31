import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from './config';

export const apiUpdateArticle = createAsyncThunk(
    'articles/updateArticle',
    async ({ slug, articleUpdate, token }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/articles/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            article: articleUpdate,
          }),
        });
        
        if (!response.ok) {
          throw new Error(response.status);
        }
        
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  