import {Link, useLocation} from 'react-router-dom';
import {ReactElement} from "react";
import styles from './Layout.module.css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/Properties' },
  { name: 'Homeowners', path: '/Homeowners' },
  { name: 'Liens', path: '/Liens' },
] as const;

interface LayoutProps {
  children: ReactElement;
}
export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) =>
      ('/' === path && path === location.pathname) ||
      ('/' !== path && location.pathname.startsWith(path));
  const navLinkClass = (path: string) => isActive(path)
      ? `${styles.navLink} ${styles.activeLink}`
      : styles.navLink;
  
  return (
      <div className={styles.layout}>
        <nav className={styles.nav}>
          {
            links.map(link => 
              <Link key={link.path} className={navLinkClass(link.path)} to={link.path}>{link.name}</Link>)
          }
        </nav>
        <main className={styles.main}>
          {children}
        </main>
      </div>
  )
}