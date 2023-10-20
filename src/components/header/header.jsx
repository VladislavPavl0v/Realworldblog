import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
     <Link to="/" className={styles.button__logo}>Realworld Blog</Link>
      <section className={styles.signButton__container}>
        <button className={styles.button__SignIn} type="button">Sign In</button>
        <button className={styles.button__signUp} type="button">Sign Up</button>
      </section>
    </header>
  );
}

export default Header;
