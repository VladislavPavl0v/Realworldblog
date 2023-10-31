import { createSlice } from '@reduxjs/toolkit';
import { apiArticleAll } from '../servis/apiArticleAll';
import { apiArticleDetails } from '../servis/apiArticleDetails';
import { apiLoginUsers } from '../servis/apiLoginUsers';
import { apiEditingAccount } from '../servis/apiEditingAccount';
import { apiRegisterUser } from '../servis/apiRegisterUsers';
import { apiCreateArticle } from '../servis/apiCreateArticle';

const sliceBlog = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    loading: false,
    articlesCount: 0,
    currentPage: 1,
    articleDetail: [],
    isOpen: false,
    error: null,
    user: null,
    createArticle: null,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    openWindows(state) {
      state.isOpen = true;
    },
    closeWindows(state) {
      state.isOpen = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiArticleAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiArticleAll.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });

    builder.addCase(apiArticleAll.rejected, (state) => {
      state.loading = false;
      state.articles = [];
    });
    builder.addCase(apiArticleDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiArticleDetails.fulfilled, (state, action) => {
      state.articleDetail = action.payload.article;
      state.loading = false;
    });
    builder.addCase(apiArticleDetails.rejected, (state) => {
      // state.articleDetail = [];
      state.loading = false;
    });
    builder.addCase(apiLoginUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(apiLoginUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(apiLoginUsers.rejected, (state, action) => {
      state.loading = false;
      if (
        !action.payload ||
        !action.payload.errors ||
        action.payload.errors.email !== "can't be blank"
      ) {
        state.error = action.payload;
      }
    });
    builder.addCase(apiEditingAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiEditingAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(apiEditingAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(apiRegisterUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(apiRegisterUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(apiCreateArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiCreateArticle.fulfilled, (state, action) => {
      state.createArticle = action.payload;
    });
    builder.addCase(apiCreateArticle.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setCurrentPage, openWindows, closeWindows, logout } = sliceBlog.actions;

export default sliceBlog.reducer;
