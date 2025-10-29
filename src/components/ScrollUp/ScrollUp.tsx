import { useEffect, useState, type ReactElement } from 'react';
import styles from './ScrollUp.module.scss';

export default function ScrollUp(): ReactElement | null {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      setScroll(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (scroll <= 500) return null;

  return (
    <button
      type="button"
      className={styles.toTop}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      aria-label="Прокрутить вверх"
    />
  );
}
