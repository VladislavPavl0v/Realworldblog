import { createSlice } from '@reduxjs/toolkit';
import { apiArticleAll } from '../servis/apiArticleAll';
import { apiArticleDetails } from '../servis/apiArticleDetails';

const sliceBlog = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    loading: false,
    articlesCount: 0,
    currentPage: 1,
    articleDetail: [],
    isArticleOpen: false,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    openArticle(state) {
      state.isArticleOpen = true;
    },
    closeArticle(state) {
      state.isArticleOpen = false;
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
      state.loading = true;
    });
  },
});

export const { addCard, setCurrentPage,openArticle,closeArticle } = sliceBlog.actions;

export default sliceBlog.reducer;
