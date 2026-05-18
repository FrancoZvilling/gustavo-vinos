import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import PillFilter from '../components/ui/PillFilter';
import Card, { CardImage, CardContent, CardBadge } from '../components/ui/Card';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import { getArticles } from '../api/services';
import './Magazine.css';

const filters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Tintos', value: 'tintos' },
  { label: 'Blancos', value: 'blancos' },
  { label: 'Maridaje', value: 'maridaje' },
  { label: 'Alta Cocina', value: 'alta-cocina' },
  { label: 'Entrevistas', value: 'entrevistas' },
];

export default function Magazine() {
  const [articles, setArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticles(activeFilter).then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, [activeFilter]);

  return (
    <PageWrapper className="magazine">
      <div className="container">
        <ScrollReveal>
          <header className="magazine__header">
            <span className="text-label">La Revista</span>
            <h1 className="heading-display magazine__title">
              Vinos, Sabores &<br />Experiencias
            </h1>
            <p className="text-body--large magazine__desc">
              Notas de cata, maridajes, entrevistas y crónicas gastronómicas para los paladares más curiosos.
            </p>
            <hr className="divider divider--center" />
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="magazine__filters">
            <PillFilter
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </ScrollReveal>

        <div className="magazine__grid">
          {loading ? (
            Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`magazine__item ${i === 0 ? 'magazine__item--large' : ''}`}>
                <SkeletonCard aspect={i === 0 ? '16/10' : '3/2'} />
              </div>
            ))
          ) : articles.length === 0 ? (
            <div className="magazine__empty">
              <p>No hay artículos en esta categoría todavía.</p>
            </div>
          ) : (
            articles.map((article, i) => (
              <ScrollReveal
                key={article.id}
                delay={i * 0.1}
                className={`magazine__item ${i === 0 ? 'magazine__item--large' : ''}`}
              >
                <Link to={`/revista/${article.slug}`} className="magazine__link">
                  <Card>
                    <CardImage
                      src={article.image}
                      alt={article.title}
                      aspect={i === 0 ? '16/10' : '3/2'}
                      overlay
                    />
                    <CardContent>
                      <CardBadge>{article.categoryLabel}</CardBadge>
                      <h2 className={i === 0 ? 'heading-section' : 'heading-card'}
                          style={{ marginTop: 'var(--space-sm)' }}>
                        {article.title}
                      </h2>
                      <p className="text-body" style={{ marginTop: 'var(--space-xs)' }}>
                        {article.excerpt.substring(0, i === 0 ? 200 : 100)}...
                      </p>
                      <div className="magazine__meta">
                        <div className="magazine__author">
                          <img src={article.author.avatar} alt={article.author.name} />
                          <span>{article.author.name}</span>
                        </div>
                        <span className="magazine__read-time">{article.readTime} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
