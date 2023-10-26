import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiLoginUsers = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://blog.kata.academy/api/users/login', {
          user: {
            email: userData.Email,
            password: userData.password,
          },
        });
        return response.data;
      } catch (errors) {
        if (!errors.response) throw errors;
        return rejectWithValue(errors.response.data);
      }
    }
  );
  