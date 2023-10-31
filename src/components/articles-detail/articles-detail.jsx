import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { apiArticleDetails } from '../../servis/apiArticleDetails';
import { openWindows, closeWindows } from '../../stores/sliceBlog';
import { formatDate } from '../../utils/dateUtils';
import Logo from '../../assets/image/logo.svg';

import styles from './articles-detail.module.scss';

function ArticlesDetail() {
  const articleDetail = useSelector((state) => state.blog.articleDetail);
  const currentUser = useSelector((state) => state.blog.user);
  const isOwner = articleDetail.author?.username === currentUser?.username;

  const { slug } = useParams();
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    if (!articleDetail || articleDetail.slug !== slug) {
      dispatch(apiArticleDetails(slug));
    }

    dispatch(openWindows());

    return () => {
      dispatch(closeWindows());
    };
  }, [dispatch, articleDetail, slug]);

  const handleImageError = () => {
    setImageError(true);
  };

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
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
            articleDetail.tagList.map((tag) => (
              <span key={tag} className={styles.tag}>
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
      {isOwner && (
        <div className={styles.containerEditButton}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement='right'
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`/articles/${slug}/edit`} className={styles.containerEditButton__buttonEdit}>
            edit
          </Link>
        </div>
      )}
      <div className={styles.body}>
        <ReactMarkdown>{articleDetail.body}</ReactMarkdown>
      </div>
    </section>
  );
}

export default ArticlesDetail;
