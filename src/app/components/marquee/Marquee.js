'use client'

import React, { useState, useEffect } from 'react';
import styles from './Marquee.module.scss';

const Marquee = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Длительность анимации в миллисекундах (15s)
    const animationDuration = 13000;

    // Таймер, который скрывает строку после завершения анимации
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, animationDuration);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        <p>Материал на сайте будет дополнятся</p>
      </div>
    </div>
  );
};

export default Marquee;