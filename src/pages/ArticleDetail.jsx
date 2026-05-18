import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import ReadingProgress from '../components/ui/ReadingProgress';
import ScrollReveal from '../components/ui/ScrollReveal';
import Card, { CardImage, CardContent, CardBadge } from '../components/ui/Card';
import { SkeletonArticle } from '../components/ui/SkeletonLoader';
import { getArticleBySlug } from '../api/services';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    getArticleBySlug(slug).then(data => {
      setArticle(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper>
        <ReadingProgress />
        <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
          <SkeletonArticle />
        </div>
      </PageWrapper>
    );
  }

  if (!article) {
    return (
      <PageWrapper>
        <div className="container article-not-found">
          <h2>Artículo no encontrado</h2>
          <Link to="/revista">Volver a la revista</Link>
        </div>
      </PageWrapper>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <PageWrapper className="article-detail">
      <ReadingProgress />

      {/* Hero */}
      <div className="article-detail__hero">
        <div className="article-detail__hero-img-wrapper">
          <motion.img
            src={article.image}
            alt={article.title}
            className="article-detail__hero-img"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="article-detail__hero-overlay" />
        <div className="article-detail__hero-content container">
          <Link to="/revista" className="article-detail__back">
            <ArrowLeft size={18} />
            <span>Volver a la revista</span>
          </Link>
          <CardBadge>{article.categoryLabel}</CardBadge>
          <h1 className="article-detail__title">{article.title}</h1>
          <p className="article-detail__subtitle">{article.subtitle}</p>
          <div className="article-detail__meta">
            <div className="article-detail__author">
              <img src={article.author.avatar} alt={article.author.name} />
              <div>
                <span className="article-detail__author-name">{article.author.name}</span>
                <span className="article-detail__author-role">{article.author.role}</span>
              </div>
            </div>
            <div className="article-detail__info">
              <span><Calendar size={14} /> {formattedDate}</span>
              <span><Clock size={14} /> {article.readTime} min de lectura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container container--narrow">
        <ScrollReveal>
          <div
            className="article-detail__body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </ScrollReveal>

        {/* Share */}
        <ScrollReveal>
          <div className="article-detail__share">
            <Share2 size={18} />
            <span>Compartir este artículo</span>
          </div>
        </ScrollReveal>
      </article>

      {/* Related Articles */}
      {article.related && article.related.length > 0 && (
        <section className="section article-detail__related">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="text-label">Seguí Leyendo</span>
                <h2 className="heading-section">Artículos Relacionados</h2>
                <hr className="divider divider--center" />
              </div>
            </ScrollReveal>

            <div className="article-detail__related-grid">
              {article.related.map((rel, i) => (
                <ScrollReveal key={rel.id} delay={i * 0.1}>
                  <Link to={`/revista/${rel.slug}`} className="article-detail__related-link">
                    <Card>
                      <CardImage src={rel.image} alt={rel.title} aspect="3/2" />
                      <CardContent>
                        <CardBadge>{rel.categoryLabel}</CardBadge>
                        <h3 className="heading-card" style={{ marginTop: 'var(--space-sm)' }}>
                          {rel.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
