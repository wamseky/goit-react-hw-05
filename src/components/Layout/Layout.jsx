import { Suspense, lazy } from 'react';
import css from './Layout.module.css';

const Navigation = lazy(() => import('../Navigation/Navigation'));

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Please wait, the page is loading.</div>}>
        {children}
      </Suspense>
    </div>
  );
}