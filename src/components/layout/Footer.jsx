import { Link } from 'react-router-dom';
import { Wine } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ScrollReveal from '../ui/ScrollReveal';
import NewsletterForm from '../ui/NewsletterForm';
import './Footer.css';

const SocialIcon = ({ type, size = 20 }) => {
  const icons = {
    instagram: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    facebook: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    twitter: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <footer className="footer">
      <div className="container">
        <ScrollReveal>
          <div className="footer__top">
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <Wine size={28} />
                <span>TERROIR</span>
              </Link>
              <p className="footer__tagline">
                Descubrí el arte de vivir bien. Vinos, gastronomía y experiencias únicas en Buenos Aires.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                  <SocialIcon type="instagram" />
                </a>
                <a href="#" className="footer__social-link" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                  <SocialIcon type="facebook" />
                </a>
                <a href="#" className="footer__social-link" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                  <SocialIcon type="twitter" />
                </a>
              </div>
            </div>

            <div className="footer__links">
              <div className="footer__column">
                <h4 className="footer__heading">Explorar</h4>
                <ul>
                  <li><Link to="/revista">Revista</Link></li>
                  <li><Link to="/restaurantes">Restaurantes</Link></li>
                  <li><Link to="/club">Club de Vinos</Link></li>
                </ul>
              </div>
              <div className="footer__column">
                <h4 className="footer__heading">Categorías</h4>
                <ul>
                  <li><Link to="/revista?filter=tintos">Tintos</Link></li>
                  <li><Link to="/revista?filter=maridaje">Maridaje</Link></li>
                  <li><Link to="/revista?filter=alta-cocina">Alta Cocina</Link></li>
                </ul>
              </div>
            </div>

            {!isMobile && (
              <div className="footer__newsletter">
                <NewsletterForm
                  variant="minimal"
                  title="Mantenete al día"
                  subtitle="Recibí lo último en vinos y gastronomía."
                />
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} TERROIR. Todos los derechos reservados.</p>
          <p className="footer__credit">Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
