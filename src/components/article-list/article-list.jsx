import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { apiArticleAll } from '../../servis/apiArticleAll';
import Article from '../article';
import ArticlesDetail from '../articles-detail/articles-detail';

import styles from './article-list.module.scss';

function ArticleList() {
  const articles = useSelector((state) => state.blog.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiArticleAll({ page: 1, limit: 5 }));
  }, []);

  return (
    <main className={styles.main}>
      <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route
          path="/articles"
          element={
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
          }
        />
        <Route path="/articles/:slug" element={<ArticlesDetail />} />
      </Routes>
    </main>
  );
}

export default ArticleList;
