import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Feed.module.scss';

export default function Feed() {
  return (
    <div className={styles.feed}>
      Feed
      <Link to="/">goto landing</Link>
    </div>
  );
}
