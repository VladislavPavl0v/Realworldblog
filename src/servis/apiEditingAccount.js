import { createAsyncThunk } from '@reduxjs/toolkit';

// import axios from 'axios';

export const apiEditingAccount = createAsyncThunk(
  'articles/editProfile',
  async (updatedUserInfo, { rejectWithValue,getState }) => {
    try {
      const token = getState().blog.user.token;
      const response = await fetch(`https://blog.kata.academy/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: updatedUserInfo,
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
