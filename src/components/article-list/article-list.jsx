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

import styles from './article-list.module.scss';

function ArticleList() {
  const articles = useSelector((state) => state.blog.articles);
  const loading = useSelector((state) => state.blog.loading);
  const articlesCount = useSelector((state) => state.blog.articlesCount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiArticleAll({ page: 1, limit: 5 }));
  }, [articlesCount]);

  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route
          path="/articles"
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
                  />
                ))}
              </ul>
            )
          }
        />
        <Route path="/articles/:slug" element={loading ? <Loader /> : <ArticlesDetail />} />
        <Route path="/sign-up" element={loading ? <Loader /> : <FormNewAccount />} />
        <Route path="/sign-in" element={loading ? <Loader /> : <FormEntrance />} />
        <Route path="/profile" element={loading ? <Loader /> : <FormEditingAccount />} />
        <Route path="/new-article" element={<PrivateRoute />}>
          <Route index element={loading ? <Loader /> : <CreateArticle />} />
        </Route>
        <Route path="/articles/:slug/edit" element={loading ? <Loader /> : <EditArticle />} />
      </Routes>
    </main>
  );
}

export default ArticleList;
