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
  const isOpen = useSelector((state) => state.blog.isOpen);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(apiArticleAll({ page }));
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
        {!isOpen && (
          <Pagination
            current={currentPage}
            total={articlesCount * 2 - 166}
            size="large"
            showTitle="false"
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        )}
      </footer>
    </ConfigProvider>
  );
}

export default Footer;
