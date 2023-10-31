import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './config';

export const apiRegisterUser = createAsyncThunk(
    'blog/apiUserRegister',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BASE_URL}/users`, {
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
  
