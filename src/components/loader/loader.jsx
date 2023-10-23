import React from 'react';
import { Spin } from 'antd';

import styles from './loader.module.scss';

function Loader() {
  return (
    <div className={styles.card}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}

export default Loader;
