import React from 'react';
import { Pagination, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { apiArticleAll } from '../../servis/apiArticleAll';
import { setCurrentPage } from '../../stores/sliceBlog';
import styles from './footer.module.scss';

function Footer() {
  const articlesCount = useSelector((state) => state.blog.articlesCount);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.blog.currentPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page)); // обновить текущую страницу
    dispatch(apiArticleAll({ page })); // загрузить новые данные
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1890FF',
          colorPrimary: '#ffffff',
        },
      }}
    >
      <footer className={styles.footer}>
        <Pagination
          current={currentPage}
          total={articlesCount * 2 - 114}
          size="large"
          showTitle="false"
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </footer>
    </ConfigProvider>
  );
}

export default Footer;
