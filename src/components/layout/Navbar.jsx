import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Wine } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/revista', label: 'Revista' },
  { path: '/restaurantes', label: 'Restaurantes' },
  { path: '/club', label: 'Club de Vinos' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);

      if (currentScroll > lastScroll && currentScroll > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  if (isMobile) return null;

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo" aria-label="Terroir - Inicio">
          <Wine size={28} className="navbar__logo-icon" />
          <span className="navbar__logo-text">TERROIR</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
