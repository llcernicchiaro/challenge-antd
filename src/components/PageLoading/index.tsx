import React from 'react';
import { Spin } from 'antd';
import logo from '@/assets/logo.svg';
import styles from './index.less';

const PageLoading: React.FC = () => (
  <div style={{ height: '100vh' }} className={styles.container}>
    <img alt="logo" src={logo} style={{ marginBottom: 48 }} />
    <Spin size="large" />
  </div>
);

export default PageLoading;
