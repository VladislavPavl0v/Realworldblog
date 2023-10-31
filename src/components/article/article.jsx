/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './article.module.scss';
import { formatDate } from '../../utils/dateUtils';
import Logo from '../../assets/image/logo.svg';

function Article({ title, tagList, description, favoritesCount, username, date, img, slug }) {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <li className={styles.card}>
      <div className={styles.section__Card__Left}>
        <div className={styles.section__title__And__Like}>
          <Link to={`/articles/${slug}`} className={styles.titleLink}>
            <h5 className={styles.title}>{title}</h5>
          </Link>
          <div className={styles.section__favoritesCount__And__like}>
            <span className={styles.favoritesCount}>{favoritesCount}</span>
            <span className={styles.like}>&#x2661;</span>
          </div>
        </div>
        <div className={styles.section__tag}>
          {tagList.map((tag,index) => (
            <span key={index} className={styles.tag}>
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
          alt="logo"
          onError={handleImageError}
        />
      </div>
    </li>
  );
}
Article.propTypes = {
  title: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

Article.defaultProps = {
  img: Logo,
};
export default Article;
