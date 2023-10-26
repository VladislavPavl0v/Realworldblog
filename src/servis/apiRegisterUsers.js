import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiRegisterUser = createAsyncThunk(
    'blog/apiUserRegister',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://blog.kata.academy/api/users', {
          user: {
            username: userData.username,
            email: userData.Email,
            password: userData.password
          }
        });
        return response.data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  
