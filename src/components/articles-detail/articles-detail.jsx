import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm, notification } from 'antd';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { openWindows, closeWindows } from '../../stores/sliceBlog';
import { apiArticleDetails } from '../../servis/apiArticleDetails';
import { apiDeleteArticle } from '../../servis/apiDeleteArticle';
import { favoriteArticle, unfavoriteArticle } from '../../servis/apiFavorite';
import { formatDate } from '../../utils/dateUtils';
import Logo from '../../assets/image/logo.svg';
import styles from './articles-detail.module.scss';

function ArticlesDetail() {
  const articleDetail = useSelector((state) => state.blog.articleDetail);
  const currentUser = useSelector((state) => state.blog.user);
  const isOwner = articleDetail.author?.username === currentUser?.username;
  const token = useSelector((state) => state.blog?.user?.token || null);

  const error = useSelector((state) => state.blog.error);
  const [apiMessage, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

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

  const confirm = () => {
    dispatch(apiDeleteArticle({ slug, token })).then(() => {
      notification.success({
        message: 'Статья успешно удалена!',
      });
      navigate('/');
    });
  };

  const cancel = () => {
    message.error('Отмена удаления статьи');
  };

  useEffect(() => {
    if (error && error.errors) {
      const errorMessages = Object.entries(error.errors)
        .map(([key, value]) => `${key} ${value}`)
        .join('. ');

      apiMessage.error({
        message: 'Ошибка авторизации',
        description: errorMessages,
      });
    }
  }, [error]);

  const handleFavoriteClick = async () => {
    if (articleDetail.favoritesCount > 0) {
      await dispatch(unfavoriteArticle({ slug, token }));
    } else {
      await dispatch(favoriteArticle({ slug, token }));
    }
  };

  return (
    <>
      {contextHolder}
      <section className={styles.article__details}>
        <div className={styles.section__Card__Left}>
          <div className={styles.section__title__And__Like}>
            <h5 className={styles.title}>{articleDetail.title}</h5>
            <div className={styles.section__favoritesCount__And__like}>
              <span className={styles.favoritesCount}>{articleDetail.favoritesCount}</span>
              <span
                className={styles.like}
                onClick={handleFavoriteClick}
                onKeyPress={handleFavoriteClick}
                role="button"
                tabIndex={0}
              >
                {articleDetail.favoritesCount > 0 ? '❤️' : '♡'}
              </span>
            </div>
          </div>
          <div className={styles.section__tag}>
            {articleDetail.tagList &&
              articleDetail.tagList.map((tag) => (
                <span key={uuidv4()} className={styles.tag}>
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
              placement="right"
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
    </>
  );
}

export default ArticlesDetail;
