/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './article.module.scss';
import { formatDate } from '../../utils/dateUtils';
import Logo from '../../assets/image/logo.svg';
import { favoriteArticle, unfavoriteArticle } from '../../servis/apiFavorite';
import { ARTICLES_PATH } from '../../routers/routePaths';

function Article({
  title,
  tagList,
  description,
  favoritesCount,
  username,
  date,
  img,
  slug,
  favorited,
}) {
  const token = useSelector((state) => state.blog?.user?.token || null);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoriteClick = async () => {
    if (!token) {
      notification.error({ message: 'для установки лайка войдите в аккаунт', duration: 2 });
      return;
    }
    if (favorited) {
      await dispatch(unfavoriteArticle({ slug, token }));
    } else {
      await dispatch(favoriteArticle({ slug, token }));
    }
  };
  
  return (
    <li className={styles.card}>
      <div className={styles.section__Card__Left}>
        <div className={styles.section__title__And__Like}>
          <Link to={`${ARTICLES_PATH}/${slug}`} className={styles.titleLink}>
            <h5 className={styles.title}>{title}</h5>
          </Link>
          <div className={styles.section__favoritesCount__And__like}>
            <span className={styles.favoritesCount}>{favoritesCount}</span>
            <span
              className={styles.like}
              onClick={handleFavoriteClick}
              onKeyPress={handleFavoriteClick}
              role="button"
              tabIndex={0}
            >
              {favorited ? '❤️' : '♡'}
            </span>
          </div>
        </div>
        <div className={styles.section__tag}>
          {tagList.map((tag) => (
            <span key={uuidv4()} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <span className={styles.description}>{description}</span>
      </div>
      <div className={styles.section__Card__Right}>
        <div className={styles.section__Username__And__Date}>
          <span className={styles.username}>{username}</span>
          <span className={styles.date}>{formatDate(date)}</span>
        </div>
        <img
          className={styles.img}
          src={imageError ? Logo : img}
          alt="User avatar"
          onError={handleImageError}
        />
      </div>
    </li>
  );
}
Article.propTypes = {
  title: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoritesCount: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string,
  favorited: PropTypes.bool,
};

Article.defaultProps = {
  img: Logo,
  description: null,
  favorited: false,
};
export default Article;
