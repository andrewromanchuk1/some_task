import React from 'react';
import styles from './NavigationButtons.module.css';
import { NavLink } from 'react-router-dom';

type NavigationButtonsProps = {};

const NavigationButtons: React.FC<NavigationButtonsProps> = () => {
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav__border_container}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active_btn : styles.nav__btn
          }
        >
          Product List
        </NavLink>
        <NavLink
          to="view"
          className={({ isActive }) =>
            isActive ? styles.active_btn : styles.nav__btn
          }
        >
          Product View
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationButtons;
