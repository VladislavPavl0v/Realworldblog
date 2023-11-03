import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { apiArticleAll } from '../../servis/apiArticleAll';
import Article from '../article';
import Loader from '../loader';
import ArticlesDetail from '../articles-detail/articles-detail';
import FormNewAccount from '../form-new-account';
import FormEntrance from '../form-entrance';
import FormEditingAccount from '../form-editing-account/form-editing-account';
import CreateArticle from '../create-article/create-article';
import EditArticle from '../edit-article';
import PrivateRoute from '../private-route';
import PrivateRouteProfile from '../private-route-profile';
import {
  ROOT_PATH,
  ARTICLES_PATH,
  ARTICLE_DETAIL_PATH,
  SIGN_UP_PATH,
  SIGN_IN_PATH,
  PROFILE_PATH,
  NEW_ARTICLE_PATH,
  EDIT_ARTICLE_PATH,
} from '../../routers/routePaths';

import styles from './article-list.module.scss';

function ArticleList() {
  const articles = useSelector((state) => state.blog.articles);
  const loading = useSelector((state) => state.blog.loading);
  const articlesCount = useSelector((state) => state.blog.articlesCount);
  const token = useSelector((state) => state.blog.user?.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiArticleAll({ page: 1, limit: 5, token }));
  }, [articlesCount,token]);
  return (
    <main className={styles.main}>
      <Routes>
        <Route path={ROOT_PATH} element={<Navigate to={ARTICLES_PATH} replace />} />
        <Route
          path={ARTICLES_PATH}
          element={
            loading ? (
              <Loader />
            ) : (
              <ul className={styles.cardList}>
                {articles.map((item) => (
                  <Article
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    tagList={item.tagList}
                    description={item.description}
                    favoritesCount={item.favoritesCount}
                    username={item.author.username}
                    date={item.updatedAt}
                    img={item.author.image}
                    favorited={item.favorited}
                  />
                ))}
              </ul>
            )
          }
        />
        <Route path={ARTICLE_DETAIL_PATH} element={loading ? <Loader /> : <ArticlesDetail />} />
        <Route path={SIGN_UP_PATH} element={loading ? <Loader /> : <FormNewAccount />} />
        <Route path={SIGN_IN_PATH} element={loading ? <Loader /> : <FormEntrance />} />
        <Route
          path={PROFILE_PATH}
          element={<PrivateRouteProfile element={loading ? <Loader /> : <FormEditingAccount />} />}
        />
        <Route
          path={NEW_ARTICLE_PATH}
          element={<PrivateRoute element={loading ? <Loader /> : <CreateArticle />} />}
        />
        <Route path={EDIT_ARTICLE_PATH} element={loading ? <Loader /> : <EditArticle />} />
      </Routes>
    </main>
  );
}

export default ArticleList;
