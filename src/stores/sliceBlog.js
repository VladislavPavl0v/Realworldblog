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
  },
  reducers: {

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiArticleAll.pending, (state) => {
      state.loading = true;
      //   console.log('Request started');
    });
    builder.addCase(apiArticleAll.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      // console.log(action.payload);
    });
    builder.addCase(apiArticleDetails.fulfilled, (state, action) => {
        state.articleDetail = action.payload.article;
      });
    builder.addCase(apiArticleAll.rejected, (state) => {
      state.loading = false;
      state.articles = [];
      //   console.error(action.error);
    });
  },
});

export const { addCard, setCurrentPage } = sliceBlog.actions;

export default sliceBlog.reducer;
