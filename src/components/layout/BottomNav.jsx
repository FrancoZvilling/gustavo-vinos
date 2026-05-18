import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MapPin, Wine, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import './BottomNav.css';

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/revista', icon: BookOpen, label: 'Revista' },
  { path: '/restaurantes', icon: MapPin, label: 'Guía' },
  { path: '/club', icon: Wine, label: 'Club' },
];

export default function BottomNav() {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  if (!isMobile) return null;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegación móvil">
      <div className="bottom-nav__items">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`bottom-nav__item ${isActive(path) ? 'bottom-nav__item--active' : ''}`}
            aria-label={label}
          >
            <div className="bottom-nav__icon-wrapper">
              {isActive(path) && (
                <motion.div
                  className="bottom-nav__indicator"
                  layoutId="bottomNavIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon size={22} className="bottom-nav__icon" />
            </div>
            <span className="bottom-nav__label">{label}</span>
          </Link>
        ))}
        <button
          className="bottom-nav__item bottom-nav__theme-btn"
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          <div className="bottom-nav__icon-wrapper">
            {theme === 'dark' ? <Sun size={22} className="bottom-nav__icon" /> : <Moon size={22} className="bottom-nav__icon" />}
          </div>
          <span className="bottom-nav__label">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
        </button>
      </div>
    </nav>
  );
}
