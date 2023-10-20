/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { apiArticleDetails } from '../../servis/apiArticleDetails';
import { formatDate } from '../../utils/dateUtils';
import Logo from '../../assets/image/logo.png';

import styles from './articles-detail.module.scss';

function ArticlesDetail() {
  const articleDetail = useSelector((state) => state.blog.articleDetail);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    dispatch(apiArticleDetails(slug));
  }, [slug]);
  const handleImageError = () => {
    setImageError(true);
  };
  console.log(articleDetail);
  return (
    <section className={styles.article__details}>
      <div className={styles.section__Card__Left}>
        <div className={styles.section__title__And__Like}>
          <h5 className={styles.title}>{articleDetail.title}</h5>
          <div className={styles.section__favoritesCount__And__like}>
            <span className={styles.favoritesCount}>{articleDetail.favoritesCount}</span>
            <span className={styles.like}>&#x2661;</span>
          </div>
        </div>
        <div className={styles.section__tag}>
          {articleDetail.tagList &&
            articleDetail.tagList.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
        </div>
        <span className={styles.description}>{articleDetail.description}</span>
      </div>
      <div className={styles.section__Card__Right}>
        <div className={styles.section__Username__And__Date}>
          <span className={styles.username}>
            {articleDetail.author && articleDetail.author.username}
          </span>
          <span className={styles.date}>
            {articleDetail.createdAt && formatDate(articleDetail.createdAt)}
          </span>
        </div>
        <img
          alt="logo"
          className={styles.img}
          src={imageError ? Logo : articleDetail.author?.image}
          onError={handleImageError}
        />
      </div>
      <div className={styles.body}>
        <ReactMarkdown>{articleDetail.body}</ReactMarkdown>
      </div>
    </section>
  );
}

export default ArticlesDetail;
