import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wine, Star, Gift, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import Card, { CardImage, CardContent, CardBadge } from '../components/ui/Card';
import StarRating from '../components/ui/StarRating';
import NewsletterForm from '../components/ui/NewsletterForm';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import { getFeaturedArticles, getFeaturedRestaurants } from '../api/services';
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [arts, rests] = await Promise.all([
          getFeaturedArticles(),
          getFeaturedRestaurants(),
        ]);
        setArticles(arts);
        setRestaurants(rests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <PageWrapper className="home">
      {/* ─── Hero Section ─── */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=80"
            alt="Copa de vino tinto"
            className="hero__bg-image"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content container">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-label">Buenos Aires · Vinos · Gastronomía</span>
            <h1 className="hero__title">
              Descubrí el arte<br />de vivir bien
            </h1>
            <p className="hero__subtitle">
              Tu guía curada de los mejores vinos, restaurantes y experiencias gastronómicas de Buenos Aires.
            </p>
            <div className="hero__cta">
              <Link to="/revista">
                <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  Explorar
                </Button>
              </Link>
              <Link to="/club">
                <Button variant="ghost" size="lg">
                  Club de Vinos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="hero__scroll-indicator">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronRight size={24} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </div>
      </section>

      {/* ─── Latest Articles ─── */}
      <section className="section home__latest" id="latest">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">Lo Último</span>
              <h2 className="heading-section">Notas Recientes</h2>
              <hr className="divider" />
            </div>
          </ScrollReveal>

          <div className="home__articles-grid">
            {loading ? (
              Array.from({ length: 3 }, (_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              articles.map((article, i) => (
                <ScrollReveal key={article.id} delay={i * 0.15}>
                  <Link to={`/revista/${article.slug}`} className="home__article-link">
                    <Card>
                      <CardImage src={article.image} alt={article.title} aspect="3/2" overlay />
                      <CardContent>
                        <CardBadge>{article.categoryLabel}</CardBadge>
                        <h3 className="heading-card" style={{ marginTop: 'var(--space-sm)' }}>
                          {article.title}
                        </h3>
                        <p className="text-body" style={{ marginTop: 'var(--space-xs)' }}>
                          {article.excerpt.substring(0, 120)}...
                        </p>
                        <div className="home__article-meta">
                          <span>{article.readTime} min de lectura</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))
            )}
          </div>

          <ScrollReveal>
            <div className="section-footer">
              <Link to="/revista">
                <Button variant="ghost" icon={<ArrowRight size={16} />}>
                  Ver todas las notas
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Featured Restaurants ─── */}
      <section className="section home__restaurants" id="restaurants">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">Destacados del Mes</span>
              <h2 className="heading-section">Restaurantes Recomendados</h2>
              <hr className="divider" />
            </div>
          </ScrollReveal>

          <div className="home__restaurants-grid">
            {loading ? (
              Array.from({ length: 3 }, (_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              restaurants.map((rest, i) => (
                <ScrollReveal key={rest.id} delay={i * 0.15}>
                  <Link to={`/restaurantes/${rest.slug}`} className="home__restaurant-link">
                    <Card>
                      <CardImage src={rest.images[0]} alt={rest.name} aspect="4/3" overlay />
                      <CardContent>
                        <div className="home__restaurant-header">
                          <h3 className="heading-card">{rest.name}</h3>
                          <StarRating rating={rest.rating} size={14} />
                        </div>
                        <div className="home__restaurant-info">
                          <span className="home__restaurant-cuisine">{rest.cuisine}</span>
                          <span className="home__restaurant-price">{rest.priceRange}</span>
                        </div>
                        <p className="text-body">{rest.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))
            )}
          </div>

          <ScrollReveal>
            <div className="section-footer">
              <Link to="/restaurantes">
                <Button variant="ghost" icon={<ArrowRight size={16} />}>
                  Ver guía completa
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Wine Club Teaser ─── */}
      <section className="section home__club-teaser" id="club-teaser">
        <div className="home__club-bg" />
        <div className="container home__club-content">
          <ScrollReveal>
            <span className="text-label" style={{ color: '#0D0D0D' }}>Próximamente</span>
            <h2 className="heading-section home__club-title">Club de Vinos TERROIR</h2>
            <p className="home__club-desc">
              Sumate a la lista de espera y convertite en <strong>Miembro Fundador</strong> con beneficios exclusivos de por vida.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="home__club-benefits">
              <div className="home__club-benefit">
                <Wine size={24} />
                <span>Vinos premium mensuales</span>
              </div>
              <div className="home__club-benefit">
                <Star size={24} />
                <span>Catas exclusivas</span>
              </div>
              <div className="home__club-benefit">
                <Gift size={24} />
                <span>Descuentos en restaurantes</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="home__club-form">
              <NewsletterForm
                title="Reservá tu lugar"
                subtitle="Dejá tu email y sé el primero en enterarte."
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link to="/club">
              <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
                Conocer el Club
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PageWrapper>
  );
}
