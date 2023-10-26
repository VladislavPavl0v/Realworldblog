import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../stores/sliceBlog';
import styles from './header.module.scss';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.blog.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <section className={styles.section}>
        <Link to="/" className={styles.button__logo}>
          Realworld Blog
        </Link>
      </section>
      <section className={styles.signButton__container}>
        {!user ? (
          <>
            <Link to="/sign-in" className={styles.button__SignIn}>
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.button__signUp}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className={styles.button__userName}>
              {user.username}
              <img className={styles.button__logo} src={user.image} alt="logo" />
            </Link>
            <button type="button" onClick={handleLogout} className={styles.button__LogOut}>
              Log Out
            </button>
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
