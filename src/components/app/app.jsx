import React from 'react';
import Header from '../header';
import ArticleList from '../article-list';
import Footer from '../footer';

import styles from './app.module.scss';

function App() {
  // console.log(window.location.pathname)
  return (
    <section className={styles.app}>
      <Header />
      <ArticleList />
      <Footer />
    </section>
  );
}

export default App;
