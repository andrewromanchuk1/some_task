import React from 'react';
import styles from './Header.module.css';
import { Outlet } from 'react-router-dom';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.header_container}>
      <p className={styles.header_title}>Frontend Task</p>
      <Outlet />
    </div>
  );
};

export default Header;
