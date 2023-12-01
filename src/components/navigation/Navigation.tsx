import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/routes';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink to={ROUTES.home}>Home</NavLink>
      <NavLink to={ROUTES.uncontrolled}>Uncontrolled</NavLink>
      <NavLink to={ROUTES.react_forms}>React forms</NavLink>
    </nav>
  );
}

export default Navigation;
