import { createSlice } from '@reduxjs/toolkit';
import { apiArticleAll } from '../servis/apiArticleAll';
import { apiArticleDetails } from '../servis/apiArticleDetails';
import { apiLoginUsers } from '../servis/apiLoginUsers';
import { apiEditingAccount } from '../servis/apiEditingAccount';
import { apiRegisterUser } from '../servis/apiRegisterUsers';
import { apiCreateArticle } from '../servis/apiCreateArticle';
import { apiUpdateArticle } from '../servis/apiUpdateArticle';
import { apiDeleteArticle } from '../servis/apiDeleteArticle';
import { favoriteArticle, unfavoriteArticle } from '../servis/apiFavorite';

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
      state.favoritedCount = action.payload.articles.favoritedCount;
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
    builder.addCase(apiRegisterUser.pending, (state) => {
      state.loading = true;
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
    builder.addCase(apiCreateArticle.fulfilled, (state) => {
      state.loading = false;
      state.articlesCount += 1;
    });
    builder.addCase(apiCreateArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(apiUpdateArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiUpdateArticle.fulfilled, (state, action) => {
      state.loading = false;
      const updatedArticles = state.articles.map((article) =>
        article.slug === action.payload.article.slug ? action.payload.article : article,
      );
      state.articles = updatedArticles;
      state.articleDetail = action.payload.article;
    });
    builder.addCase(apiUpdateArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
    builder.addCase(apiDeleteArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiDeleteArticle.fulfilled, (state) => {
      state.articlesCount -= 1;
      state.loading = false;
    });
    builder.addCase(apiDeleteArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(favoriteArticle.fulfilled, (state, action) => {
      const article = state.articles.find((a) => a.slug === action.payload.article.slug);
      if (article) {
        article.favoritesCount = action.payload.article.favoritesCount;
        article.favorited = true;
      }
      if (state.articleDetail && state.articleDetail.slug === action.payload.article.slug) {
        state.articleDetail.favoritesCount = action.payload.article.favoritesCount;
        state.articleDetail.favorited = true;
      }
    });
    builder.addCase(unfavoriteArticle.fulfilled, (state, action) => {
      const article = state.articles.find((a) => a.slug === action.payload.article.slug);
      if (article) {
        article.favoritesCount = action.payload.article.favoritesCount;
        article.favorited = false;
      }
      if (state.articleDetail && state.articleDetail.slug === action.payload.article.slug) {
        state.articleDetail.favoritesCount = action.payload.article.favoritesCount;
        state.articleDetail.favorited = false;
      }
    });
  },
});

export const { setCurrentPage, openWindows, closeWindows, logout } = sliceBlog.actions;

export default sliceBlog.reducer;
